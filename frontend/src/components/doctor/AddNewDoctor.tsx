import DoctorForm from "./DoctorForm";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { Doctor } from "./DoctorControl";

function AddNewDoctor({}) {
  // post request

  const addDoctorOnSubmit = async (addDoctor: Doctor) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addDoctor),
    };
    try {
      const fetchResponse = await fetch("/api/doctor", requestOptions);
      console.log(fetchResponse);
      return await fetchResponse.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <Heading mb={4}>Add Doctor Form</Heading>
      <DoctorForm
        onSave={async (doc: Doctor) => {
          await addDoctorOnSubmit(doc);
          navigate("/api/admin");
        }}
      />
    </>
  );
}

export default AddNewDoctor;
