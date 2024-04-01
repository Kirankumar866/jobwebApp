import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your email address"],
        minLength: [3, "Name must contain atleast 3 characters!"],
        maxLength: [30, "Name cannot exceed 30 characters!"],
    },
    email: {
        type: String,
        required : [true, "Please provide your email address"],
        validate: [validator.isEmail, "please provide valid email address"]
    },
    phone : {
        type: Number,
        required :[true, "Please provide your phone number"],
    },
    password : {
        type: String,
        required : [true, "Please provide your password!"],
        minLength : [8, "Password must be more than 8 characters"],
        maxLength: [32, "Password cannot exceed 32 characters!"],
    },
    role: {
        type : String,
        required : [true, "Please provide your role!"],
        enum : ["job seeker", "Employer"],
    },
    createdAt:{
        type : Date,
        default: Date.now,
    }


})

// Hasing the pasword
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Comparing the password
userSchema.methods.comparePassword = async (enteredPassword)=>{
    return await bcrypt.compare(enteredPassword, this.password);
}

//Generating JWT Token For authorization

userSchema.methods.getJWTToken = ()=>{
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{expireIn: process.env.JWT_EXPIRE})
}

export const User = mongoose.model("User", userSchema);