import { useState } from "react";
import { Link } from "react-router-dom";
import { MockDoctorInfo } from "../../Mocks/DoctorList";

import {
  Heading,
  Box,
  Text,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Doctor } from "./DoctorControl";

function DoctorListPage({ doctor = [] }: { doctor?: Doctor[] }) {
  console.log(doctor);

  // function deleteDoctor(id: number) {
  //   deleteDoctorInfo(id);

  //   setDoctorList(MockDoctorInfo);
  // }

  // Table header
  function renderHeader() {
    let headings: string[] = ["Name", "Gender", "Specialty", "Detail"];
    return headings.map((header) => <Th key={header}>{header}</Th>);
  }

  function renderBody() {
    return doctor.map((doc) => {
      console.log(doc);
      return (
        <Tr key={doc.userId}>
          <Td>{`${doc.firstName} ${doc.lastName}`}</Td>
          <Td>{doc.gender}</Td>
          <Td>{doc.specialty}</Td>
          <Td>
            {" "}
            <Link
              to={{
                pathname: `/view-doctor-details/${doc.userId}/${doc.lastName}`,
              }}
            >
              <Button>Detail</Button>
            </Link>
          </Td>
        </Tr>
      );
    });
  }

  return (
    <>
      <Heading>Doctor List</Heading>
      <Link
        to={{
          pathname: `/add-doctor`,
        }}
      >
        <Button onClick={() => console.log("Add")}>Add New Doctor</Button>
      </Link>

      <Table variant="simple">
        <Thead>
          <Tr>{renderHeader()}</Tr>
        </Thead>
        <Tbody>{renderBody()}</Tbody>
      </Table>
    </>
  );
}

export default DoctorListPage;
