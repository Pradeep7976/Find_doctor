import {
  SimpleGrid,
  Text,
  Center,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import { BiChevronDown } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./Presc.css";
import Prescc from "../../components/Prescc/Prescc";
import Nav from "../../components/Navbar";

const url1 = "http://localhost:7000/prescription";
const port = "http://localhost:7000";

function Doctors() {
  const [docdatai, setdocdatai] = useState([]);
  const [filter, setfilter] = useState("Disease");
  const [filterval, setfilterval] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(port + "/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        if (!response.data.auth) {
          navigate("/login");
        }
      });

    axios
      .get(port + "/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        // console.log(localStorage.getItem("token"));
        if (!response.data.auth) {
          navigate("/login");
        }
      });
    const dat = { pid: localStorage.getItem("pid") };
    axios
      .post(url1, dat)
      .then((Response) => {
        console.log(Response.data);
        let data = Response.data;
        if (data.length === 0) {
          alert("No Prescriptions Found");
        } else {
          setdocdatai(data);
        }
      })
      .catch((err) => {
        console.log("error fetching data");
      });
    console.log("fetched");
    // eslint-disable-next-line
  }, []);

  //search

  function searchi() {
    console.log(filterval);
    if (filter === "" || filterval === "") {
      console.log(filter + " " + filterval);
      alert("apply filter first");
    }
    const dat = { pid: localStorage.getItem("pid") };
    axios
      .post(port + "/filter/" + filter.toLowerCase() + "/" + filterval, dat)
      .then((resp) => {
        if (resp.data.length === 0) {
          alert("NO Prescriptions found");
        }
        setdocdatai(resp.data);
      });
  }
  return (
    <div className="doctors">
      <Nav />
      <Center>
        <Text fontSize={40} fontFamily={"Josefin Sans"}>
          Prescriptions
        </Text>{" "}
      </Center>

      <br />
      <Flex float={"right"} marginRight={6}>
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<BiChevronDown />}
              marginRight={2}
              variant="solid"
              backgroundColor={"#c7d4d1"}
              color={"black"}
            >
              {filter}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setfilter("Disease");
                }}
              >
                Disease
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setfilter("Hospital");
                }}
              >
                Hospital
              </MenuItem>
            </MenuList>
          </Menu>
          <Input
            width={180}
            height={35}
            placeholder="Filter value"
            className="search"
            onChange={(e) => {
              setfilterval(e.target.value);
            }}
          />
          <Button
            // className="sbtn"

            fontFamily={"mono"}
            fontWeight={"medium"}
            onClick={searchi}
            rightIcon={<BsSearch />}
          >
            search
          </Button>
        </Box>
      </Flex>
      <br />
      <br />
      <Flex float={"right"} marginRight={6}>
        {/* <Box paddingTop={19} paddingRight={10} > */}
        <Button
          leftIcon={
            <GrAddCircle
              size={28}
              onClick={() => {
                navigate("/prescadd");
              }}
            />
          }
          color={"white"}
          onClick={() => {
            navigate("/prescadd");
          }}
        ></Button>

        {/* </Box> */}
      </Flex>
      <br />
      <br />
      <SimpleGrid
        columns={[1, 2, 3]}
        spacing={"20"}
        mt={4}
        mx={10}
        className="doctors"
      >
        {docdatai.map((card) => {
          console.log("Cardinfo " + card.disease);
          if (card.description != null) {
            return (
              <Prescc
                disease={card.disease}
                hospital={card.hospital}
                // eslint-disable-next-line
                description={card.description}
                // eslint-disable-next-line
                date={card.date}
                prescid={card.prescid}
              />
            );
          } else {
            return (
              <Prescc
                disease={card.disease}
                hospital={card.hospital}
                description={""}
                date={card.date.slice(0, 10)}
                prescid={card.prescid}
              />
            );
          }
        })}
      </SimpleGrid>
    </div>
  );
}

export default Doctors;
