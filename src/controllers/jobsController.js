// src/controllers/jobsController.js
// Handles all CRUD operations for Jobs

import Job from "../models/jobModel.js"; // Job model (MongoDB schema)
import { AppError } from "../shared/utils/AppError.js"; // Custom error handling class


// Create job
export const createJobController = async (req, res, next) => {
  try {
    const { title, company, location, description } = req.body;

    if (!title || !company || !location) {
      return next(
        AppError.badRequest("Title, company, and location are required")
      );
    }

    // Prevent duplicate job by same user
    const existingJob = await Job.findOne({
      title,
      company,
      location,
      postedBy: req.user.userId,
    });

    if (existingJob) {
      return next(
        AppError.conflict("You have already posted this job")
      );
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      postedBy: req.user.userId,
    });

    res.status(201).json({
      status: "success",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// Get all jobs
export const fetchAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      status: "success",
      results: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// Get single job
export const fetchJobByIdController = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return next(AppError.notFound("Job not found"));
    }

    res.status(200).json({
      status: "success",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// Update job (owner only)
export const updateJobController = async (req, res, next) => {
  try {
    // 1️⃣ Fetch the job first
    const job = await Job.findById(req.params.id);

    // 2️⃣ Check if job exists
    if (!job) {
      return next(AppError.notFound("Job not found"));
    }

    // 3️⃣ Check if current user is the owner
    if (job.postedBy.toString() !== req.user.userId) {
      return next(AppError.forbidden("You are not allowed to update this job"));
    }

    // 4️⃣ Apply updates safely
    const { title, company, location, description } = req.body;
    if (title) job.title = title;
    if (company) job.company = company;
    if (location) job.location = location;
    if (description) job.description = description;

    await job.save(); // Save changes

    // 5️⃣ Send success response
    res.status(200).json({
      status: "success",
      data: job,
    });

  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Delete job (owner only)
export const deleteJobController = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return next(AppError.notFound("Job not found"));
    }

    // 🔐 OWNERSHIP CHECK
    if (job.postedBy.toString() !== req.user.userId) {
      return next(AppError.forbidden("You are not allowed to delete this job"));
    }

    await job.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
