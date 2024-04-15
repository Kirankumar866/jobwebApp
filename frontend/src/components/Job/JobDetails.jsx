import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../../main";
import { useNavigate,useParams,Link} from "react-router-dom";
import axios from "axios";

const JobDetails = () => {

  const [jobDetails, setJobDetails] = useState([]);
  const {isAuthorized,user} = useContext(Context);
  const navigateTo = useNavigate();
  const {id} = useParams();
 
  useEffect(()=>{
    const fetchJobDetails = async()=>{
      try {
        await axios.get(`https://weak-moth-belt.cyclic.app/api/v1/job/jobdetails/${id}`, {withCredentials: true})
      .then((res)=>{
      setJobDetails(res.data.job);
      
      }).catch((err)=>{
        console.log(err.response.data.message)
      })
        
      } catch (error) {
        console.error("Error fetching Jobs", error);
        
      }  
    }

    fetchJobDetails();


  }, [])


  

  


  if (!isAuthorized) {
    navigateTo("/login");
  }


  return (
    <div className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>Title : <span>{jobDetails.title}</span></p>
          <p>Category : <span>{jobDetails.category}</span></p>
          <p>Country : <span>{jobDetails.country}</span></p>
          <p>Location : <span>{jobDetails.location}</span></p>
          <p>Description : <span>{jobDetails.description}</span></p>
          <p>Job Posted On : <span>{jobDetails.jobPostedOn}</span></p>
          <p>
            Salary : {jobDetails.fixedSalary ? <span>{jobDetails.fixedSalary}$/year</span>: <span>{jobDetails.salaryFrom}$ - {jobDetails.salaryTo}$  /year</span>}
          </p>
          <p className='applyButton'>
            {user && user.role === "Employer" ? <></> : <Link to= {`/application/${jobDetails._id}`}>Apply Now</Link>}
          </p>
        </div>

      </div>
    </div>
  )
}

export default JobDetails