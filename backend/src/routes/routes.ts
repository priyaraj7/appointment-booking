import express, { Request, Response } from "express";
// import getAllDoctorDetail from "../model/queries";
import {
  getAllDoctorDetail,
  updateIndividualDoctor,
  addNewDoctor,
} from "../controller/controller";

const router = express.Router();

router.get("/admin", getAllDoctorDetail);
export default router;

router.put("/doctor/:id", updateIndividualDoctor);

router.post("/doctor", addNewDoctor);
