import { Router } from "express";

import { register, login } from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

import validate from "../validators/validation.middleware.js";

const router = Router();

// Register
router.post("/register", registerValidator, validate, register);

// Login
router.post("/login", loginValidator, validate, login);

export default router;
