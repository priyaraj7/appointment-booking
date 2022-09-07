import DoctorForm from "./DoctorForm";
import { useNavigate, useParams } from "react-router-dom";

import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getIndividualDoctor, updateIndividualDoctor } from "../../api/doctor";
import type { Doctor } from "./DoctorControl"; // type import

function EditDoctorInfo() {
  let [individualDoctor, setIndividualDoctor] = useState<Doctor>();

  const params = useParams();
  const navigate = useNavigate();

  // ! means I know doctor id always exist -- don't give error
  const userId = parseInt(params.id!, 10);

  // get request

  useEffect(() => {
    const fetchData = async () =>
      setIndividualDoctor(await getIndividualDoctor(userId));
    fetchData();
  }, [userId]);

  //PUT request
  const onSave = async (doc: Doctor) => {
    await updateIndividualDoctor(doc, userId);
    navigate("/api/admin");
  };

  return (
    <>
      <Heading>Update Doctor Info</Heading>
      <DoctorForm individualDoctorDetail={individualDoctor} onSave={onSave} />
    </>
  );
}

export default EditDoctorInfo;
