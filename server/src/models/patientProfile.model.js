import mongoose from "mongoose";

const { Schema } = mongoose;

const patientProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required."],
      unique: true,
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required."],
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required."],
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    allergies: {
      type: [String],
      default: [],
    },

    activeMedications: {
      type: [String],
      default: [],
    },

    chronicConditions: {
      type: [String],
      default: [],
    },

    emergencyContact: {
      name: {
        type: String,
        required: [true, "Emergency contact name is required."],
        trim: true,
      },

      relationship: {
        type: String,
        required: [true, "Relationship is required."],
        trim: true,
      },

      phone: {
        type: String,
        required: [true, "Emergency contact phone is required."],
        trim: true,
      },
    },

    address: {
      street: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      country: {
        type: String,
        trim: true,
      },
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Deceased"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

patientProfileSchema.index({ user: 1 }, { unique: true });
patientProfileSchema.index({ bloodGroup: 1 });
patientProfileSchema.index({ status: 1 });

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);

export default PatientProfile;
