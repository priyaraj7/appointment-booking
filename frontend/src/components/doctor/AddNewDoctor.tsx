import DoctorForm from "./DoctorForm";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { postDoctor } from "../../api/doctor";
import type { Doctor } from "./DoctorControl";

function AddNewDoctor() {
  // post request

  const onSave = async (addDoctor: Doctor) => {
    await postDoctor(addDoctor);
    navigate("/api/admin");
  };

  const navigate = useNavigate();
  return (
    <>
      <Heading mb={4}>Add Doctor Form</Heading>
      <DoctorForm onSave={onSave} />
    </>
  );
}

export default AddNewDoctor;
