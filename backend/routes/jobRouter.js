import express from "express"
import {getAllJobs,postJob, getMyJobs,updateJob,deleteJob,getSpecificJob} from "../controllers/jobController.js"
import {isAuthorized} from "../middlewares/auth.js"

const router = express.Router();

router.get("/getalljobs", getAllJobs);
router.post("/postjob", isAuthorized,postJob);
router.get("/getmyjobs", isAuthorized,getMyJobs);
router.put("/updatejob/:id", isAuthorized,updateJob);
router.delete("/deletejob/:id",isAuthorized,deleteJob)
router.get("/jobDetails/:id",isAuthorized,getSpecificJob);

export default router
