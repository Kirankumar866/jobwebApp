import React, { useState, useContext,useEffect} from 'react';
import { Context } from "../../main";
import { useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; 
import ResumeModal from './ResumeModal';
import JobSeekerCard from './JobSeekerCard';
import EmployerCard from './EmployerCard';

const MyApplications = () => {

  const [applications, setApplications] = useState([]);
  const  [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { isAuthorized,user } = useContext(Context);
  const navigateTo = useNavigate();


  useEffect(() => {
    try {
      if (isAuthorized && user.role === 'Employer'){
         axios.get("http://localhost:5000/api/v1/application/employer/getallapplications",{withCredentials: true}).then((res)=>{
          setApplications(res.data.applications)
        })  
      }
      else{
         axios.get("http://localhost:5000/api/v1/application/jobseeker/getallapplications",{withCredentials: true}).then((res)=>{
          setApplications(res.data.applications)
        })
      }
    }
    catch (error) {
      toast.error(error.response.data.message) 
    } 
  }, [isAuthorized]);
  
  if (!isAuthorized) {
    navigateTo('/login');
  }

  const handleDeleteApplication = async(id)=>{
    await axios.delete(`https://jobweb-app.vercel.app/api/v1/application/deletejobseekerapplication/${id}`,{withCredentials: true})
    .then((res)=>{
      toast.success(res.data.message);
      setApplications((prevApplications)=>prevApplications.filter((application)=>application._id!==id));
    }).catch((error)=>{
      toast.error(error.response.data.message);
    })

  }

  const openModal = (imageUrl)=>{
    setResumeImageUrl(imageUrl);
    setModalOpen(true);

  }

  const closeModal = ()=>{
    setModalOpen(false);
  }




 
  return (
    <section className="my_applications page">
      {
        user && user.role === "Job Seeker" ? (
              <div className="container">
                <h5>My Applications</h5>
                {
                  applications.map((each)=>{
                    return <JobSeekerCard application={each} key = {each._id} deleteApplication = {handleDeleteApplication} openModal = {openModal}/>
                  })
                }
              </div>

        ) : (
          <div className="container">
                <h5>Applications From Job Seekers</h5>
                {
                  applications.length > 0 ? (applications.map((each)=>{
                    return <EmployerCard application={each} key = {each._id} openModal = {openModal}/>
                  }) ) : <p>You didnt post any jobs or Nobody applied for jobs posted by you</p>
                }
          </div>
        )
      }
      {
        modalOpen && (
          <ResumeModal imageUrl = {resumeImageUrl} onClose={closeModal}/>
        )
      }
    </section>
  )
}

export default MyApplications