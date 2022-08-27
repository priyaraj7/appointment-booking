import { MockDoctorInfo } from "../../Mocks/DoctorList";

import { Link } from "react-router-dom";

import { Box, Heading, Text, Flex, Button, Spacer } from "@chakra-ui/react";
function PatientsDoctorListPage() {
  // return (
  //   <>
  //     {MockDoctorInfo.map((doctor) => {
  //       return (
  //         <Flex
  //           minWidth="max-content"
  //           alignItems="center"
  //           gap="2"
  //           p={5}
  //           shadow="md"
  //           borderWidth="1px"
  //         >
  //           <Box>
  //             <Heading fontSize="xl">
  //               {doctor.first_name} {doctor.last_name}
  //             </Heading>
  //             <Text mt={2}>
  //               <Text as="span" fontWeight="bold">
  //                 Speciality:{" "}
  //               </Text>
  //               {doctor.speciality}
  //             </Text>
  //           </Box>
  //           <Spacer></Spacer>
  //           {/* <Text>
  //             <Text as="span" fontWeight="bold">
  //               Insurance:{" "}
  //             </Text>
  //             {doctor.insurance}
  //           </Text>
  //           <Text>
  //             <Text as="span" fontWeight="bold">
  //               Available Days:{" "}
  //             </Text>
  //             {doctor.days_available}
  //           </Text> */}
  //           <Link
  //             to={{
  //               pathname: `/book-appointment/${doctor.id}`,
  //             }}
  //           >
  //             <Button colorScheme="teal">Book an appointment</Button>
  //           </Link>
  //         </Flex>
  //         //   </Box>
  //       );
  //     })}
  //   </>
  // );
  return null;
}

export default PatientsDoctorListPage;
