/**
 * Auth Routes
 * ==========================
 * Defines HTTP routes for authentication actions.
 */

const express = require("express");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

// Register user
router.post("/register", registerUser);

module.exports = router;
