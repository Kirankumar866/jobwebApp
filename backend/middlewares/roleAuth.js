import ErrorHandler from "./error.js"

export const employerAuth = (role,next)=>{
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resource",400));
    }
}

export const jobseekerAuth = (role,next)=>{
    if(role==="Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resource",400));
    }
}