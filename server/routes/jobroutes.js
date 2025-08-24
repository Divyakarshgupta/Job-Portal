import express from "express";
import { getJobById, getJobs } from "../controller/jobController.js";

const router = express.Router();

// route to get all jobs
router.get("/", getJobs);

// route to get single job by ID
router.get("/:id", getJobById);

export default router;