/**
 * Entry point of the application
 * Connects to the database and starts the Express server
 */

const app = require("./app");
const connectDB = require("./src/config/database");

// Load environment variables
require("./src/config/env");

const PORT = process.env.PORT || 5000;

// Establish database connection before starting the server
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
