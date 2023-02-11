import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import "./PReg.css";
import { AiOutlineDown } from "react-icons/ai";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DocForm() {
  const [usernamed, setusername] = useState("");
  const [emaild, setemail] = useState("");
  const [passwordd, setpassword] = useState("");
  const [date, setdate] = useState("");
  const [address, setaddressd] = useState("");
  const [gender, setgender] = useState("M");
  const [check, setcheck] = useState(false);

  let navigate = useNavigate();

  async function clicki() {
    console.log("clicked");
    if (
      usernamed == "" ||
      emaild == "" ||
      passwordd == "" ||
      date == "" ||
      address == ""
    ) {
      alert("all the form elements should be filled");
    } else {
      const dat = {
        username: usernamed,
        password: passwordd,
        email: emaild,
        address: address,
        date: date,
        gender: gender,
      };

      axios.post("http://localhost:7000/reg", dat).then((resp) => {
        if (resp.data.log == false) {
          alert("Email already present");
          setcheck(true);
          return;
        } else {
          navigate("/login");
        }
      });
    }
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
              Sign UP
            </Heading>
            <FormControl id="userName" isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: "gray.500" }}
                type="text"
                maxLength={35}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                maxLength={35}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                maxLength={35}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                placeholder="Address within 250 characters"
                _placeholder={{ color: "gray.500" }}
                type="text"
                className="des1"
                maxLength={250}
                onChange={(e) => {
                  setaddressd(e.target.value);
                }}
              />
            </FormControl>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<AiOutlineDown />}
                    marginRight={2}
                    variant="solid"
                    backgroundColor={"#c7d4d1"}
                    color={"black"}
                  >
                    {gender}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={(e) => {
                        setgender("M");
                      }}
                    >
                      M
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        setgender("F");
                      }}
                    >
                      F
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        setgender("T");
                      }}
                    >
                      T
                    </MenuItem>
                  </MenuList>
                </Menu>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>DOB</FormLabel>
                <Input
                  placeholder="DD/MM/YYYY"
                  _placeholder={{ color: "gray.500" }}
                  type="date"
                  maxLength={35}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setdate(e.target.value);
                  }}
                />
              </FormControl>
            </HStack>
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
