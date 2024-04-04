import express from "express"
import {employerGetAllApplications,jobseekerGetAllApplications,jobseekerDeleteApplication, postApplication} from "../controllers/applicationController.js"
import {isAuthorized} from "../middlewares/auth.js"
const router = express.Router();

router.get("/employer/getallapplications",isAuthorized, employerGetAllApplications);
router.get("/jobseeker/getallapplications",isAuthorized, jobseekerGetAllApplications);
router.delete("/deletejobseekerapplication/:id",isAuthorized, jobseekerDeleteApplication);
router.post("/submitapplication",isAuthorized, postApplication);


export default router
