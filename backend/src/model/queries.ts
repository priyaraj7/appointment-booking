import express, { Request, Response } from "express";
import db from "../db/db-connection";

// const getAllDoctorDetail = async () => {
//   const { rows: doctorsDetail } = await db.query("SELECT * FROM users");
//   console.log(doctorsDetail);
//   return doctorDetail;
// };

const getAllDoctorDetail = async (req: Request, res: Response) => {
  try {
    const { rows: doctorsDetail } = await db.query(
      "SELECT * FROM doctor FULL JOIN users  ON fk_user_id = user_id WHERE fk_user_id IS NOT NULL;"
    );
    // const result = await doctorsDetail
    console.log(doctorsDetail);
    res.send(doctorsDetail);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default getAllDoctorDetail;
