import { Router } from "express";

import {
  createPatient,
  getMyProfile,
  getPatientByMRN,
  getAllPatients,
} from "../controllers/patient.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import { createPatientProfileValidator } from "../validators/patient.validator.js";
import validate from "../validators/validation.middleware.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize("Admin"),
  createPatientProfileValidator,
  validate,
  createPatient,
);

router.get("/me", protect, authorize("Patient"), getMyProfile);

router.get("/", protect, authorize("Admin"), getAllPatients);

router.get(
  "/:mrn",
  protect,
  authorize("Admin", "Doctor", "Nurse"),
  getPatientByMRN,
);

export default router;
