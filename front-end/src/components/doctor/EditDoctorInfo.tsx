import DoctorForm from "./DoctorForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchIndividualDoctorInfo,
  saveIndividualDoctor,
} from "../api/FetchData";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DoctorDetail } from "./DetailDoctorPage";

function EditDoctorInfo() {
  const params = useParams();
  const navigate = useNavigate();

  if (!params.id) {
    return <div>No Doctor found</div>;
  }

  const doctorID = parseInt(params.id, 10);

  const individualDoctorDetail = fetchIndividualDoctorInfo(doctorID);

  if (!individualDoctorDetail) {
    return <div>Doctor not found</div>;
  }

  return (
    <>
      <Heading>Update Doctor Info</Heading>
      <DoctorForm
        individualDoctorDetail={individualDoctorDetail}
        onSave={(details: DoctorDetail) => {
          saveIndividualDoctor(details);
          alert(
            `You have successfully edited the ${details.first_name} information`
          );
          navigate("/");
        }}
      />
    </>
  );
}

export default EditDoctorInfo;
