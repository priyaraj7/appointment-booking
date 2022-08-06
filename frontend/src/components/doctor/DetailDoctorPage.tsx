import { useParams, Link } from "react-router-dom";
import { MockDoctorInfo } from "../../Mocks/DoctorList";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { fetchIndividualDoctorInfo } from "../api/FetchData";

export type DoctorDetail = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  location: string;
  insurance: string[];
  days_available: string[];
  speciality: string;
  about: string;
};

export default function DetailDoctorPage() {
  const params = useParams();
  if (!params.id) {
    return <div>No Doctor found</div>;
  }
  const doctorID = parseInt(params.id, 10);

  const state = fetchIndividualDoctorInfo(doctorID);
  if (!state) {
    return <div>Doctor not found</div>;
  }
  // let [doctorsList, setDoctorList] = useState(MockDoctorInfo);

  // function deleteDoctor(id: number) {
  //   const newList = doctorsList.filter((doctor: object) => doctor.id !== id);

  //   setDoctorList(newList);
  // }

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        // bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
      >
        {/* <Avatar
          size={"xl"}
          src={
            "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          }
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        /> */}
        <Heading fontSize={"2xl"} fontFamily={"body"} textAlign={"center"}>
          {state.first_name} {state.last_name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4} textAlign={"center"}>
          {state.email}
        </Text>
        <Text
        // color={useColorModeValue("gray.700", "gray.400")}
        >
          <Text as="span" fontWeight="semibold">
            About me:
          </Text>
          {state.about}
        </Text>
        <Flex>
          {" "}
          <Text fontWeight="semibold">Insurance:</Text>
          <Text>{state.insurance}</Text>
        </Flex>
        <Flex>
          <Text fontWeight="semibold">Speciality:</Text>
          <Text>{state.speciality}</Text>
        </Flex>

        <Text>
          {" "}
          <Text as="span" fontWeight="semibold">
            Available Days:
          </Text>
          {state.days_available}
        </Text>
        <Text>
          {" "}
          <Text as="span" fontWeight="semibold">
            Gender:
          </Text>
          {state.gender}
        </Text>

        <Text>
          {" "}
          <Text as="span" fontWeight="semibold">
            Location:
          </Text>
          {state.location}
        </Text>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Link
            to={{
              pathname: `/edit-doctor-details/${state.id}/${state.last_name}`,
            }}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"green"}
              _hover={{
                bg: "green.500",
              }}
              _focus={{
                bg: "green.500",
              }}
            >
              Edit
            </Button>
          </Link>
          <Button
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
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
