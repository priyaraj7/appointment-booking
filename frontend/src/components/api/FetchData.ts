import { MockDoctorInfo } from "../../Mocks/DoctorList";

import { DoctorDetail } from "../doctor/DetailDoctorPage";

export function fetchIndividualDoctorInfo(id: number) {
  return MockDoctorInfo.find((doctor) => doctor.id === id);
}

// now it is used for update the doctor detail
export function saveIndividualDoctor(doctorDetail: DoctorDetail) {
  let id = doctorDetail.id;
  let index = MockDoctorInfo.findIndex((obj) => obj.id === id);
  let doctorInfo = fetchIndividualDoctorInfo(id); // original doctor  info
  const updatedDoctorInfo = { ...doctorInfo, ...doctorDetail };
  MockDoctorInfo.splice(index, 1, updatedDoctorInfo);
}

export function addNewDoctor(doctorDetail: DoctorDetail) {
  return MockDoctorInfo.push(doctorDetail);
}

export function deleteDoctorInfo(id: number): void {
  let index = MockDoctorInfo.findIndex((obj) => obj.id === id);
  MockDoctorInfo.splice(index, 1);
}
// export defaut function fetchIndiviadualDoctorInfo(id: number) {
//     return MockDoctorInfo.find((doctor) => doctor.id === id);
//   }
