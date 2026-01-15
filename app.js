// app.js: Main Express app setup
import express from "express";
import morgan from "morgan"; // HTTP request logger
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js"; // Auth routes
import jobsRoutes from "./src/routes/jobsRoutes.js";   // Job routes

// Corrected shared folder paths
import { authRateLimiter } from "./src/shared/middleware/rateLimiter.js"; // Rate limiter
import { errorHandler } from "./src/shared/middleware/ErrorHandler.js";  // Global error handler
import { AppError } from "./src/shared/utils/AppError.js";                // Custom error class

dotenv.config(); // Load environment variables

const app = express();

// ===== Middleware =====
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev"));  // Log HTTP requests

// ===== Routes =====
// Auth routes (with rate limiter)
app.use("/api/auth", authRateLimiter, authRoutes);

// Job routes (protected inside jobsRoutes with authMiddleware)
app.use("/api/jobs", jobsRoutes);

// ===== 404 handler for unknown routes =====
app.use((req, res, next) => {
  next(AppError.notFound("Route not found"));
});

// ===== Global error handler =====
app.use(errorHandler);

export default app;
