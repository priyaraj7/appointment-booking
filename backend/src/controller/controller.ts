import * as Module from "../model/queries";

import { Request, Response } from "express";

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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    specialty: req.body.specialty,
    location: req.body.location,
    about: req.body.about,
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };
  try {
    const result = await Module.updateIndividualPatient(id, updatePatientInput);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

// Appointment

export const addNewAppointment = async (req: Request, res: Response) => {
  const fkDoctorId: number = Number.isInteger(req.body.doctorId)
    ? req.body.doctorId
    : Number.parseInt(req.body.doctorId, 10);

  const fkPatientId: number = Number.isInteger(req.body.patientId)
    ? req.body.patientId
    : Number.parseInt(req.body.patientId, 10);

  const startTime = Date.parse(req.body.startTime);
  const endTime = Date.parse(req.body.endTime);

  if (
    Number.isNaN(fkPatientId) ||
    Number.isNaN(fkDoctorId) ||
    Number.isNaN(startTime) ||
    Number.isNaN(endTime)
  ) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  let newAppointmentInput: Module.Appointment = {
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  };
  try {
    const hasConflict = await Module.checkForConflict(
      fkDoctorId,
      newAppointmentInput.startTime,
      newAppointmentInput.endTime
    );
    if (!hasConflict) {
      const result = await Module.insertAppointment(
        newAppointmentInput,
        fkDoctorId,
        fkPatientId
      );
      res.send(result);
    }
    res.send({ error: "conflict" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

// DELETE Appointment

export const deleteAppointment = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);

  try {
    await Module.deleteAppointmentQuery(id);

    res.status(200).send(`Appointment deleted with ID: ${id}`);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
