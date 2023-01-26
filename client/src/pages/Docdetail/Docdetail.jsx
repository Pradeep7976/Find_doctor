import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Docdetail.css";
// function Docdetail(props) {
//   const params = useParams();
//   const did = params.did;
//   console.log(did);
//   return (
//     <div>
//       <h1>Details</h1>
//       <h1>Details</h1>
//     </div>
//   );
// }

import {
  Box,
  Input,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Spacer,
  HStack,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import Addressc from "../../components/Addresscard/Addressc";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import Nav from "../../components/Navbar";
import { useSelector } from "react-redux";
import Review from "../../components/review/Review";
// import Rate from "../../components/Rating/Rating";

export default function Simple() {
  const params = useParams();
  const did = params.did;
  const url = "http://localhost:7000";
  const [data, setdata] = useState([]);
  const [doctor, setdoctor] = useState([]);
  const [timings, settimings] = useState([]);
  const [review, setreview] = useState("");
  const [stars, setstars] = useState(0);
  const [rating, setRating] = useState(0);
  const [pid, setpid] = useState(0);
  const [showreview, setshowreview] = useState([]);
  const [show, setshow] = useState(false);

  let navigate = useNavigate();
  const pid1 = useSelector((state) => {
    return state.changepid;
  });
  useEffect(() => {
    axios
      .get(url + "/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(localStorage.getItem("token"));
        if (!response.data.auth) {
          navigate("/login");
        }
      });
    axios.get(url + "/details/" + did).then((response) => {
      setdoctor(response.data.doctor);
      settimings(response.data.time);
      // console.log(response.data)
      // console.log(doctor);
    });
    setpid(localStorage.getItem("pid"));
  }, []);
  // setpid(pid1);
  // console.log(pid);
  function reviewsubmit() {
    if (rating > 5) {
      alert("rating must within 5");
      return;
    }

    const dat = {
      rating: rating,
      review: review,
      did: did,
      pid: pid,
    };
    console.log(dat);
    axios.post(url + "/rating", dat);
  }
  function showrev() {
    console.log("Showrev");
    if (show) setshow(false);
    if (!show) setshow(true);
    const dat = {
      did: did,
    };
    axios.post(url + "/review", dat).then((result) => {
      setshowreview(result.data);
      // console.log(result);
    });
    console.log(showreview);
  }
  return (
    <div>
      <Nav />
      <Container maxW={"100rem"}>
        <SimpleGrid py={{ base: 18, md: 24 }} paddingLeft={"3rem"}>
          <Stack>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "xl", sm: "2xl", lg: "2xl" }}
              >
                {doctor.map((doc) => {
                  return "Dr " + doc.fname + " " + doc.lname;
                })}
              </Heading>
              <br />
              <Text paddingTop={2} fontSize={"md"} fontWeight={"extrabold"}>
                {doctor.map((doc) => {
                  return doc.specialization;
                })}
              </Text>
              <Text
                fontSize={"sm"}
                align={"left"}
                float={"left"}
                fontWeight={"semibold"}
              >
                {doctor.map((doc) => {
                  return doc.yearofexperience + " Years Experience Overall ";
                })}
              </Text>
            </Box>
            <Stack direction={"column"}>
              <Text fontSize={"md"} align={"left"} float={"left"}>
                {doctor.map((doc) => {
                  return doc.description;
                })}
              </Text>
              <Text fontSize={"sm"}>
                {doctor.map((doc) => {
                  return (
                    <>
                      <HStack>
                        <Text fontSize={"sm"} fontWeight={"black"}>
                          Consultation fee per session is
                        </Text>
                        <Text fontFamily={"sans-serif"} fontWeight={"bold"}>
                          ₹{doc.fee}
                        </Text>
                      </HStack>
                    </>
                  );
                })}
              </Text>
              <Box>
                <br />
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Availability time
                </Text>
                {timings.map((one) => {
                  return (
                    <>
                      <Addressc
                        hname={one.hospitalname}
                        street={one.street}
                        city={one.city}
                        time={one.time}
                        cmpltadd={one.cmpltadd}
                      />
                      <br />
                    </>
                  );
                })}
                {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
               
              </SimpleGrid> */}
              </Box>
              {/* sf
            
            
            
            
            
            
            
            
             */}
              <Text
                color={"blue"}
                fontWeight={"extrabold"}
                onClick={showrev}
                cursor={"pointer"}
              >
                Show review
              </Text>
              {show ? (
                <>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.500"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Reviews
                  </Text>
                  {showreview.map((dat) => {
                    console.log("MAP" + dat.star);
                    return (
                      <Review
                        pid={dat.pid}
                        review={dat.review}
                        stars={dat.star}
                      />
                    );
                  })}
                </>
              ) : (
                <></>
              )}

              {/* sf
            
            
            
            
            
            
            
            
             */}
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Contact Details
                </Text>

                <List>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Email:
                    </Text>{" "}
                    {doctor.map((one) => {
                      return one.email;
                    })}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Phone:
                    </Text>{" "}
                    {doctor.map((one) => {
                      if (one.ph_num == null) {
                        return "not available";
                      } else {
                        return one.ph_num;
                      }
                    })}
                  </ListItem>
                </List>
              </Box>
              <br />
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Rating
              </Text>
              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Input
                  placeholder="out of 5"
                  maxW={"10rem"}
                  className={"ratinp"}
                  type={"number"}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
                <FormLabel>Review about experience</FormLabel>
                <Textarea
                  placeholder="300 words"
                  onChange={(e) => {
                    setreview(e.target.value);
                  }}
                />
                <br />
                <br />
                <Button
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                  onClick={reviewsubmit}
                >
                  Submit
                </Button>
              </FormControl>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  );
}
