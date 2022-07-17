import { useState } from "react";
import { Link } from "react-router-dom";
import { MockDoctorInfo } from "../../Mocks/DoctorList";
import { deleteDoctorInfo } from "../api/FetchData";
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

import { DoctorDetail } from "./DetailDoctorPage";

export function DoctorListPageComponent({
  doctorsList,
  deleteDoctor,
}: {
  doctorsList: DoctorDetail[];
  deleteDoctor: (id: number) => void;
}) {
  // Table header
  function renderHeader() {
    let headings: string[] = ["Name", "Gender", "Speciality", "Edit"];
    return headings.map((header) => <Th key={header}>{header}</Th>);
  }

  function renderBody() {
    return doctorsList.map((doc) => {
      return (
        <Tr key={doc.id}>
          <Td>{`${doc.first_name} ${doc.last_name}`}</Td>
          <Td>{doc.gender}</Td>
          <Td>{doc.speciality}</Td>
          <Td>
            {" "}
            <Link
              to={{
                pathname: `/view-doctor-details/${doc.id}/${doc.last_name}`,
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

      {/* <Table variant="simple">
        <Thead>
          <Tr>{renderHeader()}</Tr>
        </Thead>
        <Tbody>{renderBody()}</Tbody>
      </Table> */}

      {doctorsList.map((doctor) => {
        return (
          <Box key={doctor.id}>
            <Text key={doctor.id}>{doctor.first_name}</Text>
            <Text>{doctor.gender}</Text>
            <Text>{doctor.location}</Text>
            <Link
              to={{
                pathname: `/view-doctor-details/${doctor.id}/${doctor.last_name}`,
              }}
            >
              <Button>Detail</Button>
            </Link>

            {/* <Link
              to={{
                pathname: `/edit-doctor-details/${doctor.id}/${doctor.last_name}`,
              }}
            >
              <Button onClick={() => console.log("edit")}>Edit</Button>
            </Link> */}

            <Button
              onClick={() => {
                if (window.confirm("Are you sure to delete this record?"))
                  deleteDoctor(doctor.id);
              }}
            >
              Delete
            </Button>
            <hr />
          </Box>
        );
      })}
    </>
  );
}

function DoctorListPage() {
  let [doctorsList, setDoctorList] = useState([...MockDoctorInfo]);

  function deleteDoctor(id: number) {
    deleteDoctorInfo(id);
    setDoctorList([...MockDoctorInfo]);
  }

  return (
    <DoctorListPageComponent
      doctorsList={doctorsList}
      deleteDoctor={deleteDoctor}
    />
  );
}
export default DoctorListPage;
