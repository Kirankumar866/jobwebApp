import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Application} from "../models/applicationSchema.js"
import {employerAuth,jobseekerAuth} from "../middlewares/roleAuth.js"
import {Job} from "../models/jobSchema.js"
import cloudinary from "cloudinary"


//Get all applications posted by particular Employer
export const employerGetAllApplications = catchAsyncError(async(req,res,next)=>{

    const {role,_id} = req.user
    employerAuth(role,next);

    const applications =  await Application.find({'employerID.user': _id})
    res.status(200).json({
        success: true,
        applications
    })


})


//Get all applications by particular joobseeker
export const jobseekerGetAllApplications = catchAsyncError(async(req,res,next)=>{

    const {role,_id} = req.user
    jobseekerAuth(role,next);

    const applications =  await Application.find({'applicantID.user': _id})
    res.status(200).json({
        success: true,
        applications
    })

})


//Deleting the submitted application by jobseeker
export const jobseekerDeleteApplication = catchAsyncError(async (req,res,next)=>{
    const {role}= req.user
    jobseekerAuth(role,next);

    const {id} = req.params
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Application not found",400));
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application deleted successfully!!"
    })

})


//Submitting Application

export const postApplication = catchAsyncError(async(req,res,next)=>{

    const {role}= req.user;
    jobseekerAuth(role,next);

    if(!req.files || Object.keys(req.files).length === 0 || !req.files.resume){
        return next(new ErrorHandler("Resume file required!"));
    }
    const {resume} = req.files;
    console.log(req)
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"]
    if(!allowedFormats.includes(resume.mimetype) || !isValidFileExtension(resume.name)){
        return next(new ErrorHandler("Resume file should be in a PNG,JPG OR WEBP",400));
    }

    // Function to validate file extension
    function isValidFileExtension(filename) {
        const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
        const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
        return allowedExtensions.includes(ext);
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    console.log("cloudinaryResponse", cloudinaryResponse)
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "Cloudinary Error", cloudinaryResponse.error || "Unknown Cloudinary Error"
        )

        return next(new ErrorHandler("Failed to upload resume.",500));

    }

    const {
        name,
        email,
        coverLetter,
        phone,
        address,
        jobID
    } = req.body

    const applicantID = {
        user: req.user._id,
        role: "Job Seeker",
    }

    if(!jobID){
        return next(new ErrorHandler("Fill jobId",400));
    }

    const jobDetails = await Job.findById(jobID);
    if(!jobDetails){
        return next(new ErrorHandler("Job not found",404));
    }

    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    }
    if(!name || !email || !phone || !coverLetter || !address || !resume || !applicantID || !employerID){
        return next(new ErrorHandler("Please fill all fields",400));
    }

    const application = await Application.create({
        name,
        email,
        phone,
        coverLetter,
        address,
        resume:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
            
        },
        applicantID,
        employerID
    })

    res.status(200).json({
        success : true,
        message: "Application Submitted Successfully!!",
        application


    })

})



