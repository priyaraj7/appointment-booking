import express, { Request, Response } from "express";
import getAllDoctorDetail from "../model/queries";

const router = express.Router();

router.get("/doctors", getAllDoctorDetail);
export default router;
