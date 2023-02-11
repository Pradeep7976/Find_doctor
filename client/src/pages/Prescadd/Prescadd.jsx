import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import axios from "axios";
import { AiOutlineDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function Prescadd() {
  const url = "http://localhost:7000";
  /////////states/////////////////

  const [disease, setdisease] = useState("");
  const [date, setdate] = useState("");
  const [docname, setdocname] = useState(0);
  const [hospital, sethospital] = useState("");
  const [medicinename, setmedicinename] = useState("");
  const [description, setdescription] = useState("");
  const [time, settime] = useState("Morning");
  const [clicked, setclicked] = useState(false);
  // eslint-disable-next-line
  const [medicine, setmedicine] = useState([]);
  //////////end states////////////////

  let navigate = useNavigate();
  const port = "http://localhost:7000";
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
  const addmedicine = () => {
    const add = {
      time: time,
      medicinename: medicinename.toLowerCase(),
    };
    medicine.push(add);
    settime("Morning");
    setmedicinename("");

    console.log(medicine);
    setclicked(true);
  };
  const submit = () => {
    if (!clicked) {
      alert("Click add one medicinename before submitting");
      return;
    }
    if (disease === "" || hospital === "" || date === "" || docname === "") {
      alert("Please specify all the required fields");
    }
    const dat = {
      pid: localStorage.getItem("pid"),
      disease: disease.toLowerCase(),
      hospital: hospital.toLowerCase(),
      date: date,
      docname: docname,
      medicine: medicine,
      description: description,
    };
    console.log("Clicked");
    console.log(dat);
    axios.post(url + "/presadd", dat).then((res) => {
      console.log("DONE" + res.data);
    });
    navigate("/presc");
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
        <>
          <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
            Add Prescription
          </Heading>
          <Flex>
            <FormControl mr="5%" isRequired>
              <FormLabel htmlFor="Disease" fontWeight={"normal"}>
                Disease
              </FormLabel>
              <Input
                id="Disease"
                placeholder="Disease "
                maxLength={45}
                onChange={(e) => {
                  setdisease(e.target.value);
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight={"normal"}>Hospital</FormLabel>
              <Input
                id="Hospital"
                placeholder="Hospital "
                maxLength={45}
                onChange={(e) => {
                  sethospital(e.target.value);
                }}
              />
            </FormControl>
          </Flex>
          <br />
          <Flex>
            <FormControl mr="10%" isRequired>
              <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                Doctor Name
              </FormLabel>
              <Input
                id="last-name"
                type={"text"}
                placeholder="Doctor name "
                maxLength={35}
                onChange={(e) => {
                  setdocname(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mr="5%" isRequired>
              <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                Date
              </FormLabel>
              <Input
                id="first-name"
                placeholder="Date "
                type={"date"}
                onChange={(e) => {
                  setdate(e.target.value);
                }}
              />
            </FormControl>
          </Flex>

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
                {/* <HStack> */}
                <FormControl mr="5%" isRequired>
                  <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                    Medicine name
                  </FormLabel>
                  <Input
                    id="first-name"
                    placeholder="Medicine"
                    maxLength={45}
                    onChange={(e) => {
                      setmedicinename(e.target.value);
                    }}
                    value={medicinename}
                  />
                </FormControl>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<AiOutlineDown />}
                    width={"10rem"}
                    variant="solid"
                    backgroundColor={"#c7d4d1"}
                    color={"black"}
                    marginTop={"9"}
                  >
                    {time}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={(e) => {
                        settime("Morning");
                      }}
                    >
                      Morning
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        settime("Afternoon");
                      }}
                    >
                      Afternoon
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        settime("Night");
                      }}
                    >
                      Night
                    </MenuItem>
                  </MenuList>
                </Menu>
                {/* </HStack> */}
              </Flex>

              <ButtonGroup mt="5%" w="100%" paddingTop={2}>
                <Flex w="100%" justifyContent="right">
                  <Flex>
                    <Button
                      onClick={addmedicine}
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
              placeholder="Short description within 250 characters"
              type={"text"}
              maxLength={250}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              value={description}
            />
          </FormControl>
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
