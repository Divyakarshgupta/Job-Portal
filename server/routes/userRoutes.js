import express from 'express';
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controller/userController.js';
import upload from '../config/multer.js';

const router = express.Router();


// get user Data 
router.get('/user', getUserData);

//apply for a job
router.post('/apply', applyForJob);

// get user applied jobs data
router.get('/applications', getUserJobApplications);

// update user resume
router.post('/update-resume',upload.single("resume") , updateUserResume);

export default router;