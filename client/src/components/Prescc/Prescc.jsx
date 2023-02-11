import "./Prescc.css";

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function Docc(props) {
  let navigate = useNavigate();
  function routeChange() {
    let path = "/details/" + props.prescid;
    console.log(path);
    navigate(path);
  }
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        className="docc"
        onClick={routeChange}
      >
        <Stack>
          <Text
            color={"grey"}
            // textTransform={"uppercase"}
            fontWeight={600}
            fontSize={"xs"}
            letterSpacing={1.1}
          >
            {props.hospital + " Hospital"}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"xl"}
            fontFamily={"Open Sans"}
          >
            {props.disease}
          </Heading>
          <Text color={"gray.500"}>
            {props.description.slice(0, 70) + " ..."}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <HStack spacing={150}>
            <Stack direction={"column"} fontSize={"sm"}>
              <Text color={"gray.500"} fontWeight={"bold"}>
                {props.date.slice(0,10)}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
}
