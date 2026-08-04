import { body } from "express-validator";

export const createPatientProfileValidator = [
  body("user")
    .notEmpty()
    .withMessage("User ID is required.")
    .isMongoId()
    .withMessage("Invalid User ID."),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required.")
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender."),

  body("bloodGroup")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood group."),

  body("allergies")
    .optional()
    .isArray()
    .withMessage("Allergies must be an array."),

  body("activeMedications")
    .optional()
    .isArray()
    .withMessage("Active medications must be an array."),

  body("chronicConditions")
    .optional()
    .isArray()
    .withMessage("Chronic conditions must be an array."),

  body("emergencyContact.name")
    .trim()
    .notEmpty()
    .withMessage("Emergency contact name is required."),

  body("emergencyContact.relationship")
    .trim()
    .notEmpty()
    .withMessage("Relationship is required."),

  body("emergencyContact.phone")
    .trim()
    .notEmpty()
    .withMessage("Emergency contact phone is required."),

  body("address.street").optional().trim(),

  body("address.city").optional().trim(),

  body("address.state").optional().trim(),

  body("address.country").optional().trim(),
];

export const updateContactValidator = [
  body("emergencyContact")
    .optional()
    .isObject()
    .withMessage("Emergency contact must be an object."),

  body("emergencyContact.name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Emergency contact name cannot be empty."),

  body("emergencyContact.relationship")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Relationship cannot be empty."),

  body("emergencyContact.phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty."),

  body("address")
    .optional()
    .isObject()
    .withMessage("Address must be an object."),

  body("address.street").optional().trim(),
  body("address.city").optional().trim(),
  body("address.state").optional().trim(),
  body("address.country").optional().trim(),
];
