import * as Module from "../model/queries";

import express, { Request, Response } from "express";
import db from "../db/db-connection";

// export type User = {
//   userId: number;
//   firstName: string;
//   lastName?: string;
//   email: string;
//   gender: string;
// };

// export type Doctor = {
//   doctorId: number;
//   speciality: string;
//   location: string;
//   about: string;
//   status: boolean;
// };

export const getAllDoctorDetail = async (req: Request, res: Response) => {
  //console.log(req);
  try {
    const result = await Module.getAllDoctorDetailQuery();
    //debugger;
    console.log(result);
    return res.send(result);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getIndividualDoctor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  // let getDoctorInfo = {
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   email: req.body.email,
  //   gender: req.body.gender,
  //   specialty: req.body.specialty,
  //   location: req.body.location,
  //   about: req.body.about,
  //   status: req.body.status,
  // };
  try {
    const result = await Module.getIndividualDoctorQuery(id);
    res.send(result);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const updateIndividualDoctor = async (req: Request, res: Response) => {
  // write validation
  let id = Number(req.params.id);
  let updateDoctorInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    specialty: req.body.specialty,
    location: req.body.location,
    about: req.body.about,
    status: req.body.status,
  };
  try {
    const result = await Module.updateIndividualDoctorQuery(
      id,
      updateDoctorInfo
    );
    console.log(result, "update result");
    res.send(result);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const addNewDoctor = async (req: Request, res: Response) => {
  let newInput: Module.CreateDoctorInput = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    email: req.body.email as string,
    gender: req.body.gender as string,
    specialty: req.body.specialty as string,
    location: req.body.location as string,
    about: req.body.about as string,
    status: req.body.status as boolean,
  };
  try {
    const result = await Module.insertDoctorAndUserInfo(newInput);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

//  ...............   PATIENT   ...............

export const addNewPatient = async (req: Request, res: Response) => {
  let newPatientInput: Module.CreatePatientInput = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    email: req.body.email as string,
    gender: req.body.gender as string,
    address: req.body.address as string,
    phoneNumber: req.body.phoneNumber as string,
  };
  try {
    const result = await Module.addingPatientAndUserInfo(newPatientInput);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const updatePatientInfo = async (req: Request, res: Response) => {
  // write validation
  let id = Number(req.params.id);
  console.log(id);
  let updatePatientInput: Module.CreatePatientInput = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    email: req.body.email as string,
    gender: req.body.gender as string,
    address: req.body.address as string,
    phoneNumber: req.body.phoneNumber as string,
  };
  try {
    const result = await Module.updateIndividualPatient(id, updatePatientInput);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
