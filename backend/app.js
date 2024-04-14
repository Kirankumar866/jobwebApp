import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import {dbConnection} from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin: "https://jobzee-neon.vercel.app/", // Allow requests from this origin
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow specified HTTP methods
    credentials: true // Allow credentials (cookies, authorization headers)
  }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));



app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.get("/",(req,res)=>{
    res.json("Hello")
})

dbConnection();

app.use(errorMiddleware);


export default app
