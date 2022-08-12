import express, { Request, Response } from "express";
// import getAllDoctorDetail from "../model/queries";
import { getAllDoctorDetail } from "../controller/controller";

const router = express.Router();

router.get("/doctors", getAllDoctorDetail);
export default router;
