import {
  createPatientProfile,
  getMyPatientProfile,
  getPatientProfileByMRN,
} from "../services/patient.service.js";

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

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await getMyPatientProfile(req.user._id);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// Get patient profile using MRN
export const getPatientByMRN = async (req, res, next) => {
  try {
    const patient = await getPatientProfileByMRN(req.params.mrn);

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};
