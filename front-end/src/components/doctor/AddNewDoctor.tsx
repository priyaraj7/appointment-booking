import DoctorForm from "./DoctorForm";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DoctorDetail } from "./DetailDoctorPage";

import { addNewDoctor } from "../api/FetchData";

function AddNewDoctor() {
  const navigate = useNavigate();
  return (
    <>
      <Heading mb={4}>Add Doctor Form</Heading>
      <DoctorForm
        onSave={(doc: DoctorDetail) => {
          addNewDoctor(doc);
          navigate("/");
        }}
      />
    </>
  );
}

export default AddNewDoctor;
