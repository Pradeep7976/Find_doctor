import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Prescdetail.css";

import {
  Box,
  Container,
  Stack,
  Text,
  Heading,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Button,
} from "@chakra-ui/react";
import Medicinecard from "../../components/Medicinecard/Medicinecard";

import axios from "axios";
import Nav from "../../components/Navbar";

export default function Simple() {
  const params = useParams();
  const prescid = params.prescid;
  const url = "http://localhost:7000";

  const [prescription, setprescriptions] = useState([]);
  const [medicine, setmedicine] = useState([]);

  let navigate = useNavigate();

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
    axios.get(url + "/details/" + prescid).then((response) => {
      setprescriptions(response.data.prescription);
      setmedicine(response.data.medicine);
      console.log(response.data);
    });
    // eslint-disable-next-line
  }, []);
  function delclick() {
    axios.get(url + "/delete/" + prescid);
    navigate("/presc");
  }
  return (
    <div>
      <Nav />
      <Flex float={"right"}>
        <Button onClick={delclick}>delete</Button>
      </Flex>
      <Container maxW={"100rem"}>
        <SimpleGrid py={{ base: 18, md: 24 }} paddingLeft={"3rem"}>
          <Stack>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "xl", sm: "2xl", lg: "2xl" }}
              >
                {prescription.map((presc) => {
                  return presc.disease;
                })}
              </Heading>
              <br />
              <Text paddingTop={2} fontSize={"lg"} fontWeight={"extrabold"}>
                {prescription.map((presc) => {
                  return (
                    presc.hospital.charAt(0).toUpperCase() +
                    presc.hospital.slice(1) +
                    " Hospital"
                  );
                })}
              </Text>
              <br />
              <Text
                fontSize={"lg"}
                align={"left"}
                float={"left"}
                fontWeight={"semibold"}
              >
                {prescription.map((presc) => {
                  return " Treated by Dr." + presc.doctorname;
                })}
              </Text>
              <br />
              <br />
              <Text
                fontSize={"sm"}
                align={"left"}
                float={"left"}
                fontWeight={"semibold"}
              >
                {prescription.map((presc) => {
                  return " visited on " + presc.date.slice(0, 10);
                })}
              </Text>
            </Box>
            <Stack direction={"column"}>
              <Text fontSize={"md"} align={"left"} float={"left"}>
                {prescription.map((doc) => {
                  return doc.description;
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
                  Medicines specified with time
                </Text>
                {medicine.map((one) => {
                  return (
                    <>
                      <Medicinecard tablet={one.medicinename} time={one.time} />
                      <br />
                    </>
                  );
                })}
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  );
}
