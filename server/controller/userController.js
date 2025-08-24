import JobApplication from "../Models/jobApplication.js";
import User from "../Models/User.js";
import {v2 as cloudinary} from "cloudinary";
import Job from "../Models/job.js";



// get user data
export const getUserData = async (req, res) => {

    const userid = req.auth.userId;

    try {

        const user = await User.findById(userid);

        if(!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            user})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// apply for a job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body;
    const userId = req.auth.userId;

    try {
        
        const isAlreadyApplied = await JobApplication.find({jobId,userId});
            if(isAlreadyApplied.length > 0) {
        return res.json({ success: false, message: "You have already applied for this job" });
            }
        
            const jobData = await Job.findById(jobId);
            
            if(!jobData) {
                return res.json({ success: false, message: "Job not found" });
            }

            await JobApplication.create({
                userId,
                companyId: jobData.companyId,
                jobId,
                date: Date.now()
            });

            res.json({ success: true, message: "Job application successful" });


   } catch (error) {
        res.json({ success: false, message:"something went wrong"});
    }
}

// get user applied applications
export const getUserJobApplications = async (req, res) => {

    try {
        
        const userId = req.auth.userId;

        const applications = await JobApplication.find({userId})
        .populate("companyId","name email image")
        .populate("jobId","title description location salary level category")
        .exec()

        if(!applications ) {
            return res.json({ success: false, message: "No applications found" });
        }

        res.json({ success: true, applications });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Update user profile
export const updateUserResume = async (req, res) => {

    try {
        
        const userId = req.auth.userId;

        const resumeFile = req.file;
        
        const userData = await User.findById(userId);

        if(!resumeFile){
            return res.json({ success: false, message: "Please upload a resume" });
        }

        if(resumeFile){
            const resumeUpload= await cloudinary.uploader.upload(resumeFile.path);
            userData.resume =  resumeUpload.secure_url;
        }

        await userData.save();
        res.json({ success: true, message: "Resume updated successfully" });
    }  catch (error) {
        res.json({ success: false, message: error.message });
    }
}
