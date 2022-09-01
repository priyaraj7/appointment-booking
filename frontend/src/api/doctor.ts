import type { Doctor } from "../components/doctor/DoctorControl";
const commonRequestOptions = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const getAllDoctor = async () => {
  const request = await fetch("/api/admin");
  const result = await request.json();

  //console.log(result);
  return result;
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

export const getIndividualDoctor = async (userId: number) => {
  const request = await fetch(`/api/doctor/${userId}`);
  const result = await request.json();
  return result;
};

export const updateIndividualDoctor = async (doc: Doctor, userId: number) => {
  const requestOptions = {
    ...commonRequestOptions,
    method: "PUT",
    body: JSON.stringify(doc),
  };
  try {
    const fetchResponse = await fetch(`/api/doctor/${userId}`, requestOptions);
    console.log(fetchResponse);
    return await fetchResponse.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
