/**
 * Handles connection to MongoDB using Mongoose
 * This function is called once when the server starts.
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    // Stop the app if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
