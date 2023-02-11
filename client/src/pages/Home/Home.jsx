import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";

import axios from "axios";


import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const port = "http://localhost:7000";
  let navigate = useNavigate();
  function nav() {
    navigate("/presc");
  }
  function addnav() {
    navigate("/prescadd");
  }
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
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* <Nav /> */}
      <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={
          "url(https://ik.imagekit.io/aj4rz7nxsa/Smart_presc/3661875_hjhslGvle.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1676142063492)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Heading color={"white"}>Smart Prescription!</Heading>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "xl", md: "2xl" })}
            >
              Way to store prescription smartly
            </Text>
            <Stack direction={"row"}>
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={nav}
              >
                View prescription
              </Button>
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={addnav}
              >
                Add Prescription
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </div>
  );
}
export default Home;
