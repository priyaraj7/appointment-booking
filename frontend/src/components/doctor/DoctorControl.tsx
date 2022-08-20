import { useEffect, useState } from "react";
import DoctorListPage from "./DoctorList";
import AddNewDoctor from "./AddNewDoctor";

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
    const getAllDoctor = async () => {
      const request = await fetch("/api/admin");
      const result = (await request.json()) as Doctor[];

      console.log(result);
      setDoctor(result);
    };
    getAllDoctor();
  }, []);

  return (
    <>
      <DoctorListPage doctor={doctor} />
      {/* <AddNewDoctor addDoctorOnSubmit={addDoctorOnSubmit} /> */}
    </>
  );
};

export default DoctorControl;
