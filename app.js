/**
 * App Configuration
 * ==========================
 * Initializes Express app, middleware, and routes.
 */

const express = require("express");

const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));

module.exports = app;
