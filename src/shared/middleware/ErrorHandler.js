import { AppError } from "../utils/AppError.js"; // use relative path

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
};
