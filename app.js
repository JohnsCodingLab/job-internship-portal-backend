/**
 * App Configuration
 * ==========================
 * Initializes Express app, middleware, and routes.
 */

import CookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(CookieParser());
app.use(cors());
app.use(helmet());

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));

// 404 handler
app.all("{/*path}", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

export default app;
