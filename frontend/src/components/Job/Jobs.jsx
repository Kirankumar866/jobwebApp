import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../../main";
import { useNavigate,Link} from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const Jobs = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs state with useState hook
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  if (!isAuthorized) {
    navigateTo("/login");
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        await axios.get("https://jobweb-app.vercel.app/api/v1/job/getalljobs", { withCredentials: true })
        .then((res)=>{
          setJobs(res.data.jobs)
        })
         
      } catch (error) {
        console.error("Error fetching Jobs", error);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array to run useEffect only once on component mount


  return (
    <section className='jobs page'>
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {
            jobs&& jobs.map((eachJob)=>{
                return (
                  <div className="card" key={eachJob._id}>
                    <p>{eachJob.title}</p>
                    <p>{eachJob.category}</p>
                    <p>{eachJob.country}</p>
                    <Link to={`/jobdetails/${eachJob._id}`}>
                      Job Details
                    </Link>
                  </div>

                )
              }) 
            
          }
        </div>
      </div>

    </section>
  );
}

export default Jobs;
