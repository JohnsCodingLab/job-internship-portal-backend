import { Router } from "express";
import {
  createJobController,
  fetchAllJobs,
  fetchJobByIdController,
  updateJobController,
  deleteJobController,
} from "../controllers/jobsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", fetchAllJobs);
router.get("/:id", fetchJobByIdController);

// Protected routes
router.post("/", authMiddleware, createJobController);
router.put("/:id", authMiddleware, updateJobController);
router.delete("/:id", authMiddleware, deleteJobController);

export default router;
