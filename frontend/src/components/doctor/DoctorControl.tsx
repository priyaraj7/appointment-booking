import { useEffect, useState } from "react";
import DoctorListPage from "./DoctorList";

import { getAllDoctor } from "../../api/doctor";

export type Doctor = {
  doctorId: number;
  fkUserId: number;
  userId: number;
  firstName: string;
  lastName?: string;
  email: string;
  gender: string;
  location: string;
  specialty: string;
  status: boolean;
  about: string;
};

const DoctorControl = () => {
  let [doctor, setDoctor] = useState<Doctor[]>([]);

  // get request
  useEffect(() => {

    let ignore = false;
    const getAllDoctor = async () => {
      const request = await fetch("/api/admin");
      const result = (await request.json()) as Doctor[];

      console.log(result);
      console.log(result);
      if (!ignore) {
        setDoctor(result);
      }
      
    };
    getAllDoctor();
    return () => {
      ignore = true;
    };

  }, []);

  return (
    <>
      <DoctorListPage doctor={doctor} />
    </>
  );
};

export default DoctorControl;
