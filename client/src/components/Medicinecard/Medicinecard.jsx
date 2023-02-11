import {
  Avatar,
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
function TestimonialCard(props) {
  const { name, role, content, avatar, index } = props;
  return (
    <Flex
      boxShadow={"lg"}
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
      borderColor={"red"}
      borderStyle={"solid"}
    >
      <Flex direction={"column"} textAlign={"left"}>
        <chakra.p
          fontFamily={"Rubik"}
          fontWeight={"Regular"}
          fontSize={"20px"}
          pb={4}
        >
          {props.tablet.charAt(0).toUpperCase() + props.tablet.slice(1)}
        </chakra.p>
        <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
          <Text fontFamily={"Almarai"} fontWeight={"300"}>
            {props.time}
          </Text>
        </chakra.p>
      </Flex>
    </Flex>
  );
}
export default TestimonialCard;
