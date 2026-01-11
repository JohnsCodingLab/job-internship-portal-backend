/**
 * Initializes the Express application
 * Registers global middleware and base routes
 */

const express = require("express");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Health check route to confirm API is running
app.get("/", (req, res) => {
  res.send("Job Internship Portal API is running");
});

module.exports = app;
