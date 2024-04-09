import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide Job Title"],
        minLength: [3, "Title must contain atleast 3 characters!"],
        maxLength: [30, "Title cannot exceed 30 characters!"],
    },
    description : {
        type: String,
        required: [true, "Please provide Job description"],
        minLength: [3, "description must contain atleast 3 characters!"],
        maxLength: [1000, "description cannot exceed 1000 characters!"],
    },
    category : {
        type: String,
        required: [true, "Please provide Job category"],
    },
    country:{
        type: String,
        required: [true, "Please provide Job country"],

    },
    city:{
        type: String,
        required: [true, "Please provide Job city"],
    },
    location:{
        type: String,
        required: [true, "Please provide exact location"],
    },
    fixedSalary: { 
        type: Number,
        minLength: [5, "salary must contain atleast 5 characters!"],
        maxLength: [7, "salary cannot exceed 7 characters!"],
    },
    salaryFrom: {
        type: Number,
        minLength: [5, "salaryFrom must contain atleast 4 characters!"],
        maxLength: [7, "salaryFrom cannot exceed 9 characters!"],
    },
    salaryTo: {
        type: Number,
        minLength: [5, "salaryTo must contain atleast 4 characters!"],
        maxLength: [7, "salaryTo cannot exceed 9 characters!"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }

});

export const Job = mongoose.model("job",jobSchema);

