// Authentication middleware
// Protects routes by validating JWT token
import jwt from "jsonwebtoken";
import { env } from "../config/env.js"; // Environment variables (contains JWT_SECRET)

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET); // Verify JWT
    req.user = decoded; // Attach user info to request
    next(); // Proceed to next middleware/controller
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
