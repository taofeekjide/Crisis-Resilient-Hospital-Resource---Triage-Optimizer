import {
  createPatientProfile,
  getMyPatientProfile,
  getPatientProfileByMRN,
  getAllPatientProfiles,
  updateMyContactInformation,
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

export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await getAllPatientProfiles(req.query);

    res.status(200).json({
      success: true,
      results: patients.length,
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyContact = async (req, res, next) => {
  try {
    const profile = await updateMyContactInformation(req.user._id, req.body);

    res.status(200).json({
      success: true,
      message: "Contact information updated successfully.",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
