import * as Module from "../model/queries";

import express, { Request, Response } from "express";
import db from "../db/db-connection";

// const getAllDoctorDetail = async () => {
//   const { rows: doctorsDetail } = await db.query("SELECT * FROM users");
//   console.log(doctorsDetail);
//   return doctorDetail;
// };

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
//   active: boolean;
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

export const updateIndividualDoctor = async (req: Request, res: Response) => {
  // write validation
  let id = Number(req.params.id);
  let updateDoctorInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    speciality: req.body.speciality,
    location: req.body.location,
    about: req.body.about,
    active: req.body.active,
  };
  try {
    const result = await Module.updateIndividualDoctorQuery(
      id,
      updateDoctorInfo
    );
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
    active: req.body.active as boolean,
  };
  try {
    const result = await Module.insertDoctorAndUserInfo(newInput);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
