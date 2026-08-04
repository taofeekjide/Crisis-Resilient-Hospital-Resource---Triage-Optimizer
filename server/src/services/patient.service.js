import User from "../models/user.model.js";
import PatientProfile from "../models/patientProfile.model.js";
import AppError from "../utils/AppError.js";
import generateMRN from "../utils/generateMRN.js";
import APIFeatures from "../utils/apiFeatures.js";

// To Create patient profile
export const createPatientProfile = async (patientData) => {
  const { user } = patientData;

  const existingUser = await User.findById(user);

  if (!existingUser) {
    throw new AppError("User not found.", 404);
  }

  if (existingUser.role !== "Patient") {
    throw new AppError(
      "Patient profile can only be created for users with the Patient role.",
      400,
    );
  }

  const existingProfile = await PatientProfile.findOne({ user });

  if (existingProfile) {
    throw new AppError("This user already has a patient profile.", 409);
  }

  // Generate a Medical Record Number (MRN)
  const mrn = await generateMRN();

  const patientProfile = await PatientProfile.create({
    ...patientData,
    mrn,
  });

  return await PatientProfile.findById(patientProfile._id).populate({
    path: "user",
    select: "firstName lastName email phone role",
  });
};

export const getMyPatientProfile = async (userId) => {
  const profile = await PatientProfile.findOne({
    user: userId,
  }).populate({
    path: "user",
    select: "firstName lastName email phone role",
  });

  if (!profile) {
    throw new AppError("Patient profile not found.", 404);
  }

  return profile;
};

// Get a patient profile using MRN
export const getPatientProfileByMRN = async (mrn) => {
  const patient = await PatientProfile.findOne({ mrn }).populate({
    path: "user",
    select: "firstName lastName email phone role",
  });

  if (!patient) {
    throw new AppError("Patient profile not found.", 404);
  }

  return patient;
};

// Get all patient profiles
export const getAllPatientProfiles = async (queryString) => {
  const features = new APIFeatures(
    PatientProfile.find().populate({
      path: "user",
      select: "firstName lastName email phone role",
    }),
    queryString,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const patients = await features.query;

  return patients;
};
