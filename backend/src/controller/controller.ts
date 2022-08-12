import * as Module from "../model/queries";

import express, { Request, Response } from "express";
import db from "../db/db-connection";

// const getAllDoctorDetail = async () => {
//   const { rows: doctorsDetail } = await db.query("SELECT * FROM users");
//   console.log(doctorsDetail);
//   return doctorDetail;
// };

export const getAllDoctorDetail = async (req: Request, res: Response) => {
  try {
    const result = await Module.getAllDoctorDetailQuery();
    res.send(result);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// const updateIndividualDoctor =async (req: Request, res: Response) => {
//     try {

//     }

//     catch (error) {

//     }

//   }
