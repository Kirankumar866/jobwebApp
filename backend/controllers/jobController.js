import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Job} from "../models/jobSchema.js"


// GET ALL JOBS
export const getAllJobs = catchAsyncError(async(req,res,next)=>{

    const jobs = await Job.find();
    res.status(200).json({
        success: true,
        jobs,
    })

})

//POST A JOB
export const postJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resource",400));
    }
    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo} = req.body;

    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please provide full job details",400));
    }
    
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please provide either fixed or ranged salary details",400));
    }
    if(salaryFrom &&salaryTo && fixedSalary){

        return next(new ErrorHandler("Can not provide both fixed and ranged salary details",400));
    }

    const postedBy = req.user._id;

    const job = await Job.create({
        title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo, postedBy
    })
    

    res.status(200).json({
        success: true,
        message: "Job posted successfully!",
        job
    })



})

//GET MY JOBS
export const getMyJobs = catchAsyncError(async(req,res,next)=>{
    const {email,role,_id} = req.user
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker cant retrive jobs",400));
    }

    const myJobs = await Job.find({ postedBy: _id });
    if (myJobs.length == 0) {
        return next(new ErrorHandler("No jobs found for this employer", 404));
    } 
    
    res.status(200).json({
        success: true,
        message: `Retrived all the jobs posted by ${email}`,
        myJobs
    })

})

// UPDATE A JOB 

export const updateJob = catchAsyncError(async (req,res,next)=>{
    const {role,_id} = req.user
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker cant update jobs",400));
    }
    const {id} = req.params;

    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Sorry, Job not found!",400));
    }
    
    if (job.postedBy.toString()!== _id.toString()) {
        return next(new ErrorHandler("You are not the author of the post", 403));
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false, 
    })
    res.status(200).json({
        success: true,
        message: "Successfully Updated Job!",
        job,
    })
})

// DELETE JOB
export const deleteJob = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params
    const {role,_id} = req.user
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker cant update jobs",400));
    }

    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Sorry, Job not found!",400));
    }
    
    if (job.postedBy.toString()!== _id.toString()) {
        return next(new ErrorHandler("You are not the author of the post", 403));
    }
    await Job.deleteOne()
    res.status(200).json({
        success: true,
        message : "Job deleted successfully!",
        
        
    })



})

//Get Specific JOB details

export const getSpecificJob = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params;
    try {
        const job = await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Sorry, Job not found!",400));
        }
        res.status(200).json({
            success: true,
            message: "Job Details retrived successfully!",
            job
        })
        

    } catch (error) {

        return next(new ErrorHandler("Invalid ID / CastError", 403));
        
    }

})

