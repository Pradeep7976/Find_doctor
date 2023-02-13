const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const app = express();

const Docrecep = require("./model/docreg");
const Secret = "jwtsecret";
const patient = require("./model/patient");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://sinchana:sinch7@cluster0.cd2wqmb.mongodb.net/Receptionist?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongo");
  })
  .catch(() => {
    console.log("Error connecting to Database");
  });

/////////////////////////////////////////////         sql Connection  /////////////////////////////////////////////////////////////////////

const Client = require("pg").Pool;

const client = new Client({
  user: "sinchana",
  host: "db.bit.io",
  database: "sinchana/Smartpresc",
  password: "v2_3y7dQ_n5YVXwG4GJJ26C2EFPv8umu",
  port: 5432,
  ssl: true,
});

/////////////////////////////////////////////////         sql connection end        /////////////////////////////////////////////////////////////////////

const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Sorry bro no token");
  } else {
    jwt.verify(token, Secret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U fail to auth bro " });
        console.log("notauthorised");
      } else {
        console.log("authorsed");
        req.userId = decoded.id;
        next();
      }
    });
  }
};
app.get("/", (req, res) => {
  res.send("Server is not crashed");
});
app.get("/isUserAuth", verifyJwt, (req, res) => {
  res.json({ auth: true });
});

////////////////////////////////////////////////////          LOGIN          ///////////////////////////////////////////////////////////////
app.post("/plogin", async (req, res) => {
  const email1 = req.body.email;
  const password = req.body.password;
  console.log(email1);
  console.log(password);
  const User = await patient.findOne({ email1 });
  const Passwordcorrect =
    User === null ? false : await bcrypt.compare(password, User.password);
  if (!(User && Passwordcorrect)) {
    return res.status(401).json({
      error: "invalid email or Password",
    });
  } else {
    const email = User.email;
    try {
      client.query(
        `select pid from patients where email=$1`,
        [email1],
        (err, result) => {
          const token = jwt.sign({ email }, Secret, { expiresIn: 10000 });
          res.json({
            auth: true,
            token: token,
            user: User,
            pid: result.rows[0].pid,
          });
        }
      );
    } catch (err) {
      res.send(err);
    }
  }
});
////////////////////////////////////////////////////          SIGN UP          ///////////////////////////////////////////////////////////////
app.post("/reg", async (req, res) => {
  console.log("Received");

  const saltRounds = 10;
  const username = req.body.username;
  const password = req.body.password;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const email = req.body.email;
  const address = req.body.address;
  const date = req.body.date;
  const gender = req.body.gender;
  const Users = await patient.findOne({ email });

  const year = date.toString().slice(0, 4);
  const day = date.toString().slice(5, 7);
  const month = date.toString().slice(8, 10);
  const datee = day + "-" + month + "-" + year;
  const data = {
    username: username,
    password: passwordHash,
    email: email,
    address: address,
    date: datee,
    gender: gender,
  };
  console.log(datee);
  if (Users === null) {
    // if (true) {
    console.log("Request received");
    const dat = new patient({
      email: email,
      password: passwordHash,
    });
    // console.log("date comming" + data.date);
    dat.save();

    /////////////////////////////////       to add to Patients table       //////////////////////////////////////////////////
    try {
      const id = await client.query(
        `select * from id order by pid desc `,
        (err, result) => {
          if (err) {
            console.log("ERROR FETCHING ID");
          } else {
            idi = result.rows[0].did;
            pid = result.rows[0].pid;
            // client.query(`insert into id values($1,$2)`, [idi,pid + 1]);
            client.query(`update id set pid = $1 where pid =$2;`, [
              pid + 1,
              pid,
            ]);
            client.query(
              `insert into patients values($1,$2,$3,$4,$5,$6,$7)`,
              [
                pid,
                data.username,
                data.date,
                data.address,
                data.gender,
                data.password,
                data.email,
              ],
              (err, resu) => {
                if (resu) {
                  // console.log(resu);
                  console.log("DONE CREATING ACCOUNT");
                } else {
                  console.log("ERROR CREATING ACCOUNT");
                  console.log("");
                  console.log("");
                  console.log("");
                  console.log(err);
                }
              }
            );
          }
        }
      );
    } catch (err) {
      res.send(err);
    }
    //////////////////////////////         adding done           ///////////////////////////////////////////////////////////

    const token = jwt.sign({ email }, Secret, { expiresIn: 800 });
    console.log(token);

    return res.status(200).json({ auth: true, token: token });
  } else {
    res.send({ log: false });
  }
  //

  ///
});
/////////////////////////////////////////////////////////         delete presc                ////////////////////////////////////
app.get("/delete/:prescid", async (req, res) => {
  const prescid = req.params.prescid;
  try {
    await client.query(
      `delete from medicine where prescid=$1 `,
      [prescid],
      (err, result1) => {
        client.query(
          `delete from prescription where prescid=$1`,
          [prescid],
          (err, result) => {
            if (err) {
              console.log("error");
            } else {
              console.log("Done delete");
            }
          }
        );
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});
/////////////////////////////////////////////////////////          ADD Prescription           //////////////////////////////////////////////////

app.post("/presadd", async (req, res) => {
  const data = {
    pid: req.body.pid,
    disease: req.body.disease,
    hospital: req.body.hospital,
    date: req.body.date,
    docname: req.body.docname,
    medicine: req.body.medicine,
    description: req.body.description,
  };
  const year = data.date.toString().slice(0, 4);
  const day = data.date.toString().slice(5, 7);
  const month = data.date.toString().slice(8, 10);
  const datee = day + "-" + month + "-" + year;
  console.log(data);
  // return;
  try {
    await client.query(
      `select * from id order by prescid desc `,
      async (err, result) => {
        if (err) {
          console.log("ERROR FETCHING ID");
          res.send();
        } else {
          prescid = result.rows[0].prescid;
          client.query(`update id set prescid = $1 where prescid =$2;`, [
            prescid + 1,
            prescid,
          ]);
          await client.query(
            `insert into prescription values($1,$2,$3,$4,$5,$6,$7)`,
            [
              prescid,
              data.disease,
              data.hospital,
              data.docname,
              datee,
              data.description,
              data.pid,
            ]
          );

          data.medicine.map(async (med) => {
            client.query(
              `insert into medicine values($1,$2,$3)`,
              [prescid, med.medicinename, med.time],
              (err, res) => {
                if (err) {
                  console.log("medicine");
                  console.log(err);
                }
              }
            );
          });
          console.log("DONE UPLOAD");
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
  // res.send("OK");
  console.log(data);
});

////////////////////////////////////////////////////       ALL DOCTORS         / ////////////////////////////////////////////////////////////////

app.post("/prescription", async (req, res) => {
  try {
    await client.query(
      `select * from prescription where pid =$1`,
      [req.body.pid],
      (err, result) => {
        if (err) {
          console.log("ERROR FETCHING DATA");
        } else {
          res.send(result.rows);
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});
//////////////////////////////////////////////////      full doctors details   ////////////////////////////////////////////////////////////

app.get("/details/:prescid", async (req, res) => {
  const prescid = req.params.prescid;

  await client.query(
    `select * from prescription where prescription.prescid = $1`,
    [prescid],
    (err, result) => {
      if (err) {
        res.status(500).json({ err: "Fetching prescription data err" });
        return;
      } else {
        const presc = result.rows;
        client.query(
          `select * from medicine where prescid = $1`,
          [prescid],
          (err, result1) => {
            if (err) {
              res.status(500).json({ err: "Fetching time failed" });
            } else {
              console.log("SENT THE DETAILS");
              res
                .status(200)
                .json({ prescription: presc, medicine: result1.rows });
            }
          }
        );
      }
    }
  );
});

//////////////////////////////////////////////////        Search doctors      ////////////////////////////////////////////////////////////////

app.post("/filter/:filter/:filterval", (req, res) => {
  const filter = req.params.filter;
  let filterval = req.params.filterval;
  const pid = req.body.pid;
  console.log("PID:", pid);
  console.log(filter + filterval);
  try {
    if (filter == "disease") {
      client.query(
        `select * from prescription where disease=$1 and pid=$2;`,
        [filterval, req.body.pid],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result.rows);
            console.log(result.rows);
          }
        }
      );
    } else if (filter == "hospital") {
      client.query(
        `select * from prescription where hospital=$1 and pid =$2`,
        [filterval, pid],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result.rows);
            console.log(result.rows);
          }
        }
      );
    }
  } catch (err) {
    res.send(err);
  }
});

app.listen(7000 || process.env.PORT, function () {
  console.log(`Server started on port 7000 `);
});
