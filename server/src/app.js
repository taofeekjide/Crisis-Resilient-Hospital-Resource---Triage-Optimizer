import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

import healthRoutes from "./routes/health.routes.js";

import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import patientRoutes from "./routes/patient.routes.js";

const app = express();

// Security Middleware
app.use(helmet());

app.use(cors());

app.use(express.json());

// HTTP Request Logger
app.use(morgan("dev"));

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);

// 404 Middleware for not found
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
