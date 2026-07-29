import { createPatientProfile } from "../services/patient.service.js";

export const createPatient = async (req, res, next) => {
  try {
    const patient = await createPatientProfile(req.body);

    res.status(201).json({
      success: true,
      message: "Patient profile created successfully.",
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};
