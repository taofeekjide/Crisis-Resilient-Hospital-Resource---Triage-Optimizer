import Counter from "../models/counter.model.js";

const generateMRN = async () => {
  const currentYear = new Date().getFullYear();

  const counter = await Counter.findByIdAndUpdate(
    "patientMRN",
    {
      $inc: {
        sequenceValue: 1,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  const sequence = String(counter.sequenceValue).padStart(6, "0");

  return `MRN-${currentYear}-${sequence}`;
};

export default generateMRN;
