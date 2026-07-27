import { Router } from "express";
import protect from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user.",
    data: req.user,
  });
});

export default router;
