import DoctorForm from "./DoctorForm";
import { useNavigate, useParams } from "react-router-dom";

import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Doctor } from "./DoctorControl"; // type import

function EditDoctorInfo() {
  let [individualDoctor, setIndividualDoctor] = useState<Doctor>();

  const params = useParams();
  const navigate = useNavigate();

  // ! means I know doctor id always exist -- don't give error
  const doctorID = parseInt(params.id!, 10);

  // get request

  useEffect(() => {
    const getIndividualDoctor = async () => {
      const request = await fetch(`/api/doctor/${doctorID}`);
      const result = (await request.json()) as Doctor;

      console.log(result);
      setIndividualDoctor(result);
    };

    getIndividualDoctor();
  }, []);

  return (
    <>
      <Heading>Update Doctor Info</Heading>
      <DoctorForm
        individualDoctorDetail={individualDoctor}
        onSave={async (doc: Doctor) => {
          await fetch(`/api/doctor/${doctorID}`, {
            method: "PUT",
            body: JSON.stringify(doc),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          navigate("/api/admin");
        }}
      />
    </>
  );
}

export default EditDoctorInfo;
