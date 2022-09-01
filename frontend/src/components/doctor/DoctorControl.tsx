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
    const fetchData = async () => setDoctor(await getAllDoctor());
    fetchData();
  }, []);

  return (
    <>
      <DoctorListPage doctor={doctor} />
    </>
  );
};

export default DoctorControl;
