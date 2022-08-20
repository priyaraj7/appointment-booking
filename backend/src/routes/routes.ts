import express, { Request, Response } from "express";
// import getAllDoctorDetail from "../model/queries";
import {
  getAllDoctorDetail,
  getIndividualDoctor,
  updateIndividualDoctor,
  addNewDoctor,
  addNewPatient,
  updatePatientInfo,
} from "../controller/controller";

const router = express.Router();

router.get("/admin", getAllDoctorDetail);

router.get("/doctor/:id", getIndividualDoctor);

router.put("/doctor/:id", updateIndividualDoctor);

router.post("/doctor", addNewDoctor);

// Patient
router.post("/patient", addNewPatient);

router.put("/patient/:id", updatePatientInfo);

export default router;
