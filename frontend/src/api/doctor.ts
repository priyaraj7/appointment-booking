import type { Doctor } from "../components/doctor/DoctorControl";
const commonRequestOptions = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const postDoctor = async (addDoctor: Doctor) => {
  const requestOptions = {
    ...commonRequestOptions,
    method: "POST",
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

// export  const getIndividualDoctor = async () => {
//   const request = await fetch(`/api/doctor/${userId}`);
//   const result = (await request.json()) as Doctor;

//   console.log(result);
//   if (!ignore) {
//     setIndividualDoctor(result);
//   }
// };
