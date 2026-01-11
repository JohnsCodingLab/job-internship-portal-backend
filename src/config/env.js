/**
 * Loads environment variables from the .env file into process.env
 * This allows us to keep sensitive data (like DB URIs) out of source code.
 */
const dotenv = require("dotenv");

dotenv.config();
