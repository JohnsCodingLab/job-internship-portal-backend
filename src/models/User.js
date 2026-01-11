/**
 * User model
 * Represents users of the Job Internship Portal application
 * This includes students, employers, and admins.
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // User's full name
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    // User's email address (must be unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Hashed password (hashing will be handled later)
    password: {
      type: String,
      required: true,
    },

    // Role of the user within the system
    role: {
      type: String,
      enum: ["user", "employer", "admin"],
      default: "user",
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
