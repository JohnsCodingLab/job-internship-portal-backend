/**
 * Initializes the Express application
 * Registers global middleware and base routes
 */

import CookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(CookieParser());
app.use(cors());
app.use(helmet());

// Health check route to confirm API is running
app.get("/", (req, res) => {
  res.send("Job Internship Portal API is running");
});

// 404 handler
app.all("{/*path}", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

export default app;
