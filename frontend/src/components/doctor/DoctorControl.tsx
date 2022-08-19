import { useEffect, useState } from "react";
import DoctorListPage from "./DoctorList";

export type Doctor = {
  doctorId: number;
  fkUserId: number;
  userId: number;
  firstName: string;
  lastName?: string;
  email: string;
  gender: string;
  location: string;
  speciality: string;
};

const DoctorControl = () => {
  let [doctor, setDoctor] = useState<Doctor[]>([]);

  useEffect(() => {
    const getAllDoctor = async () => {
      const request = await fetch("/api/admin");
      const result = (await request.json()) as Doctor[];

      console.log(result);
      setDoctor(result);
    };
    getAllDoctor();
  }, []);

  // const listDoctor = doctor.map((doc: any) => {
  //   return (
  //     <li key={doc.id}>
  //       {doc.first_name}
  //       {/* ID: {doc.id} NAME:{doc.firstName} EMAIL:{doc.email} */}
  //     </li>
  //   );
  // });

  return <DoctorListPage doctor={doctor} />;
};

export default DoctorControl;
