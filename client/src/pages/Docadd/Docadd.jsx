import React, { useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { BiSearchAlt2, BiFilter } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
export default function Docadd() {
  const url = "http://localhost:7000";
  /////////states/////////////////
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [specialization, setspecialization] = useState("");
  const [yrsofexp, setyrsofexp] = useState(0);
  const [email, setemail] = useState("");
  const [time, settime] = useState("");
  const [Hospital, setHospital] = useState("");
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [cmpltadd, setcmpltadd] = useState("");
  const [phno, setphno] = useState(0);
  const [fee, setfee] = useState(0);
  const [description, setdescription] = useState("");
  const [gender, setgender] = useState("M");
  const [clicked, setclicked] = useState(false);
  // eslint-disable-next-line
  const [address, setaddress] = useState([]);
  //////////end states////////////////

  const addaddress = () => {
    const add = {
      time: time,
      hospital: Hospital,
      street: street.toLowerCase(),
      city: city.toLowerCase(),
      cmpltadd: cmpltadd,
    };
    address.push(add);
    settime("");
    setHospital("");
    setstreet("");
    setcity("");
    setcmpltadd("");
    console.log(address);
    setclicked(true);
  };
  const submit = () => {
    if (!clicked) {
      alert("Click add one to add a address before submitting");
      return;
    }
    const dat = {
      lname: lname,
      fname: fname,
      specialization: specialization.toLowerCase(),
      yrsofexp: yrsofexp,
      email: email.toLowerCase(),
      phno: phno,
      fee: fee,
      address: address,
      description: description,
      gender: gender,
    };
    console.log("Clicked");
    console.log(dat);
    axios.post(url + "/docreg", dat).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <Box>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        {/* <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress> */}
        <>
          <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
            Doctor Registration
          </Heading>
          <Flex>
            <FormControl mr="5%" isRequired>
              <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                First name
              </FormLabel>
              <Input
                id="first-name"
                placeholder="First name "
                onChange={(e) => {
                  setfname(e.target.value);
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                Last name
              </FormLabel>
              <Input
                id="last-name"
                placeholder="First name "
                onChange={(e) => {
                  setlname(e.target.value);
                }}
              />
            </FormControl>
          </Flex>
          <br />
          <Flex>
            <FormControl mr="5%" isRequired>
              <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                Specialization
              </FormLabel>
              <Input
                id="first-name"
                placeholder="Specialization "
                onChange={(e) => {
                  setspecialization(e.target.value);
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                Years of experience
              </FormLabel>
              <Input
                id="last-name"
                type={"number"}
                placeholder="Years of experience "
                onChange={(e) => {
                  setyrsofexp(e.target.value);
                }}
              />
            </FormControl>
          </Flex>
          <FormControl mt="2%" isRequired>
            <HStack>
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
              <FormLabel htmlFor="email" fontWeight={"normal"}>
                Email
              </FormLabel>
              <Input
                id="email"
                type="email "
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </HStack>
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          </FormControl>
          <FormControl
            border={10}
            borderColor={"#dae6f5"}
            borderStyle={"solid"}
            borderWidth={1}
            paddingLeft={2}
            marginTop={4}
            paddingTop={3}
            paddingBottom={4}
            paddingRight={2}
          >
            <VStack>
              <Flex>
                <FormControl mr="5%" isRequired>
                  <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                    Time
                  </FormLabel>
                  <Input
                    id="first-name"
                    placeholder="HH:MM (24)"
                    onChange={(e) => {
                      settime(e.target.value);
                    }}
                    value={time}
                  />
                </FormControl>
                <FormControl mr="5%" isRequired>
                  <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                    Hospital
                  </FormLabel>
                  <Input
                    id="first-name"
                    placeholder="Hospital"
                    onChange={(e) => {
                      setHospital(e.target.value);
                    }}
                    value={Hospital}
                  />
                </FormControl>
                <FormControl mr="5%" isRequired>
                  <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                    Area
                  </FormLabel>
                  <Input
                    id="first-name"
                    placeholder="Area"
                    onChange={(e) => {
                      setstreet(e.target.value);
                    }}
                    value={street}
                  />
                </FormControl>
                <FormControl mr="5%" isRequired>
                  <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                    city
                  </FormLabel>
                  <Input
                    id="first-name"
                    placeholder="city"
                    onChange={(e) => {
                      setcity(e.target.value);
                    }}
                    value={city}
                  />
                </FormControl>
              </Flex>

              <FormControl mr="5%">
                <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                  Complete Address
                </FormLabel>
                <Textarea
                  id="first-name"
                  placeholder="Complete Address"
                  type={"Number"}
                  onChange={(e) => {
                    setcmpltadd(e.target.value);
                  }}
                  value={cmpltadd}
                />
              </FormControl>
              <ButtonGroup mt="5%" w="100%" paddingTop={2}>
                <Flex w="100%" justifyContent="right">
                  <Flex>
                    <Button
                      onClick={addaddress}
                      colorScheme="teal"
                      variant="solid"
                      w="7rem"
                      mr="5%"
                    >
                      Add one
                    </Button>
                  </Flex>
                </Flex>
              </ButtonGroup>
            </VStack>
          </FormControl>
          <FormControl mr="5%">
            <FormLabel htmlFor="first-name" fontWeight={"normal"}>
              Description
            </FormLabel>
            <Textarea
              id="first-name"
              placeholder="Short description"
              type={"text"}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              value={description}
            />
          </FormControl>
          <Flex paddingTop={2}>
            <FormControl mr="5%">
              <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                Phone no
              </FormLabel>
              <Input
                id="phone-number"
                placeholder="Phone no"
                type={"Number"}
                onChange={(e) => {
                  setphno(e.target.value.toString());
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                Consultation fee
              </FormLabel>
              <Input
                id="in rupees"
                placeholder=" in rupees"
                type={"number"}
                onChange={(e) => {
                  setfee(e.target.value);
                }}
              />
            </FormControl>
          </Flex>
        </>
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="right">
            <Flex>
              <Button
                onClick={submit}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
