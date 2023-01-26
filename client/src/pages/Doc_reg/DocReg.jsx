import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  Textarea,
} from "@chakra-ui/react";
import "./DovReg.css";
import { SmallCloseIcon } from "@chakra-ui/icons";
import WaveB from "../../components/WaveB/WaveB";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DocForm() {
  const [fname, setFname] = useState("");
  const [lname, setlname] = useState("");
  const [emaild, setemail] = useState("");
  const [phnod, setphno] = useState("");
  const [Specializationd, setspecialization] = useState("");
  const [rating, setrating] = useState("");
  const [yearsofexp, setyearsofexp] = useState("");
  const [description, setdescription] = useState("");
  const [check, setcheck] = useState(false);

  let navigate = useNavigate();

  async function clicki() {
    console.log("clicked");
    const dat = {
      fname: fname,
      lname: lname,
      phno: phnod,
      email: emaild,
      specialization: Specializationd,
      description: description,
      yearsofexp: yearsofexp,
      rating: rating,
    };
    await axios.post("http://localhost:7000/docreg", dat).then((resp) => {
      if (!resp.data) {
        alert("User name already exists");
      } else {
        console.log("Done");
        navigate("/doctors");
      }
    });
  }
  return (
    <Box width={"100%"} height={"100%"} n>
      <Box classname="cardi">
        <Flex
          className="docreg"
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            className="card1 scrollable-div"
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Doctor Profile Edit
            </Heading>
            {/* <FormControl id="userName">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full" backgroundColor={"#08839c"} color="white">
                    Change Icon
                  </Button>
                </Center>
              </Stack>
            </FormControl> */}
            <FormControl id="userName" isRequired>
              <FormLabel> Fname</FormLabel>
              <Input
                placeholder="First Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel> Lname</FormLabel>
              <Input
                placeholder="Last Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone no</FormLabel>
              <Input
                placeholder="Phone no"
                _placeholder={{ color: "gray.500" }}
                type="number"
                onChange={(e) => {
                  setphno(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="Specialization" isRequired>
              <FormLabel>Specialization</FormLabel>
              <Input
                placeholder="Specialization"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => {
                  setspecialization(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                _placeholder={{ color: "gray.500" }}
                type="text"
                className="des1"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Experience</FormLabel>
              <Input
                placeholder="experience in years"
                _placeholder={{ color: "gray.500" }}
                type="number"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setyearsofexp(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Rating</FormLabel>
              <Input
                placeholder="Rating in number"
                _placeholder={{ color: "gray.500" }}
                type="number"
                onChange={(e) => {
                  setrating(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                onClick={clicki}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}

export default DocForm;
