// Service layer: handles all database operations for jobs
import Job from "../models/jobModel.js";

/**
 * Get all jobs from the database
 */
export const getAllJobs = async () => {
  return await Job.find();
};

/**
 * Get a single job by ID
 * @param {string} id - MongoDB ObjectId of the job
 */
export const getJobById = async (id) => {
  return await Job.findById(id);
};

/**
 * Create a new job
 * @param {Object} jobData - { title, company, location, description, postedBy }
 */
export const createNewJob = async (jobData) => {
  return await Job.create(jobData);
};

/**
 * Update an existing job
 * @param {string} id - MongoDB ObjectId of the job
 * @param {Object} jobData - updated fields
 */
export const updateJobById = async (id, jobData) => {
  return await Job.findByIdAndUpdate(id, jobData, { new: true, runValidators: true });
};

/**
 * Delete a job
 * @param {string} id - MongoDB ObjectId of the job
 */
export const deleteJobById = async (id) => {
  return await Job.findByIdAndDelete(id);
};
