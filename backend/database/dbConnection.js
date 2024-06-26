import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database Connected");
        
    }).catch(err=>{
        console.log(`Some error occured while connecting to database. ${err}`);
    })
}

