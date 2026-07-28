import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = Router();

// authenticated user
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

router.get("/admin", protect, authorize("Admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
  });
});

// Admin, Doctor or Nurse (Staffs only)
router.get("/staff", protect, authorize("Admin", "Doctor"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Staff Member!",
  });
});

export default router;
