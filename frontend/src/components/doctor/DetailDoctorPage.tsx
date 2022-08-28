import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";

import type { Doctor } from "./DoctorControl"; // type import

// export default function DetailDoctorPage({
//   individualDoctor,
// }: {
//   individualDoctor?: Doctor;
// })

export default function DetailDoctorPage() {
  let [individualDoctor, setIndividualDoctor] = useState<Doctor>();

  const params = useParams();

  // ! means I know doctor id always exist -- don't give error
  const userId = parseInt(params.id!, 10);

  // get request
  // https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data
  // you need to add last name to the url
  useEffect(() => {
    let ignore = false;
    const getIndividualDoctor = async () => {
      const request = await fetch(`/api/doctor/${userId}`);
      const result = (await request.json()) as Doctor;

      console.log(result);
      if (!ignore) {
        setIndividualDoctor(result);
      }
    };

    getIndividualDoctor();
    return () => {
      ignore = true;
    };
  }, [userId]);

  return individualDoctor ? (
    <Center py={6}>
      <Box
        // maxW={"320px"}
        // w={"full"}
        // bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"} textAlign={"center"}>
          {individualDoctor.firstName} {individualDoctor.lastName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4} textAlign={"center"}>
          {individualDoctor.email}
        </Text>
        <Text
        // color={useColorModeValue("gray.700", "gray.400")}
        >
          <Text as="span" fontWeight="semibold">
            About:
          </Text>
          {individualDoctor.about}
        </Text>

        <Flex>
          <Text fontWeight="semibold">Specialty:</Text>
          <Text>{individualDoctor.specialty}</Text>
        </Flex>

        <Text>
          {" "}
          <Text as="span" fontWeight="semibold">
            Gender:
          </Text>
          {individualDoctor.gender}
        </Text>

        <Text>
          {" "}
          <Text as="span" fontWeight="semibold">
            Location:
          </Text>
          {individualDoctor.location}
        </Text>

        {/* <Stack mt={8} direction={"row"} spacing={4}> */}
        <Link
          to={{
            pathname: `/edit-doctor-details/${individualDoctor.userId}/${individualDoctor.lastName}`,
          }}
        >
          <Button
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            fontSize={"sm"}
            rounded={"full"}
            bg={"tomato"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "red.500",
            }}
            _focus={{
              bg: "red.500",
            }}
          >
            Edit
          </Button>
        </Link>
        {/* <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"tomato"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "red.500",
            }}
            _focus={{
              bg: "red.500",
            }}
          >
            Delete
          </Button> */}
        {/* </Stack> */}
      </Box>
    </Center>
  ) : (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
}
