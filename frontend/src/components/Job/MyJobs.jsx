import React, { useState, useContext,useEffect} from 'react';
import { Context } from "../../main";
import { useNavigate,Link} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; 
import { FaCheck,FaTrash } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { FaRegEdit } from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Graphics & Design",
  },
  {
    id: 2,
    title: "Mobile App Development",
    
  },
  {
    id: 3,
    title: "Frontend Web Development",
    
  },
  {
    id: 4,
    title: "MERN STACK Development",
    
  },
  {
    id: 5,
    title: "Account & Finance",
    
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    
  },
  {
    id: 7,
    title: "Video Animation",
    
  },
  {
    id: 8,
    title: "Game Development",
  },
];


const MyJobs = () => {

  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized,user } = useContext(Context);
  const navigateTo = useNavigate();


  if (!isAuthorized) {
    navigateTo("/login");
  }
  if (isAuthorized && user.role !== 'Employer') {
    toast.error(`${user.role} do not have jobs posted.`)
    navigateTo('/');
  }

  useEffect(()=>{
    const fetchMyJobs = async ()=>{
      try {
        const {data} = await axios.get("http://localhost:5000/api/v1/job/getmyjobs",{withCredentials: true})
        setMyJobs(data.myJobs)
        
      } catch (error) {
        console.log("Error",error)
        toast.error(error.response.data.message);
        
      }     
    }
    fetchMyJobs();

  },[]);

  const handleEnableEdit = (jobId)=>{
    setEditingMode(jobId)

  }
  const handleCancelEdit = (jobId) => {
    
    setEditingMode(null);
  };

//Update Job 
  const handleUpdateJob = async(jobId)=>{

    const updateJob = myJobs.find((job)=>job?._id === jobId);
    console.log(updateJob)
    await axios.put(`http://localhost:5000/api/v1/job/updatejob/${jobId}`, updateJob,{
      withCredentials:true
    }).then((res)=>{
      toast.success(res.data.message);
      setEditingMode(null);
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })

  }

  //Delete Job
  const handleDeleteJob = async(jobId)=>{
    await axios.delete(`https://nice-rose-capybara-cape.cyclic.app/api/v1/job/deletejob/${jobId}`,{withCredentials: true})
    .then((res)=>{
      toast.success(res.data.message);
      setMyJobs((prevJobs)=>prevJobs.filter((job)=>job._id!==jobId));
    }).catch((error)=>{
      toast.error(error.response.data.message);
    })

  }

  //HandleInputChange

  const handleInputChange = (jobId,field,value)=>(
    setMyJobs((prevJobs)=>(
      prevJobs.map((job)=>{
        return job._id===jobId ? {...job, [field]: value} : job})
    ))
  )

  const displayingJobs = ()=>
    (
      <div className="banner">
        {myJobs.map((job)=>(
            <div className="card" key={job?._id}>
              <div className="content">
                <div className="short_fields">
                  <div>
                    <span>Title: </span>
                    <input type="text" disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.title} onChange={(e)=>{handleInputChange(job?._id,"title", e.target.value)}}/>
                  </div>
                  <div>
                    <span>Country: </span>
                    <input type="text" disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.country} onChange={(e)=>{handleInputChange(job?._id,"country", e.target.value)}}/>
                  </div>
                  <div>
                    <span>City: </span>
                    <input type="text" disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.city} onChange={(e)=>{handleInputChange(job?._id,"city", e.target.value)}}/>
                  </div>
                  <div>
                    <span>Category: </span>
                    <select disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.category} onChange={(e)=>{handleInputChange(job._id,"category", e.target.value)}}>
                      <option value="" disabled>Select Category</option>
                      {
                        categories.map((eachCategory)=> <option value= {eachCategory?.title}  key={eachCategory?.id}>{eachCategory?.title}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <span>Salary: {""} 
                    {job?.fixedSalary ? (
                    <input type="number" disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.fixedSalary} onChange={(e)=>{handleInputChange(job?._id,"fixedSalary", e.target.value)}}/>
                    ):
                    (
                      <div>
                        <input type="number" disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.salaryFrom} onChange={(e)=>{handleInputChange(job?._id,"salaryFrom", e.target.value)}}/>
                    <input type="number" disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.salaryTo} onChange={(e)=>{handleInputChange(job?._id,"salaryTo", e.target.value)}}/>

                      </div>
                    )}
                    </span>
                    
                  </div> 
                  <div>
                    <span>
                      Expired: 
                    </span>
                    <select disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.expired} onChange={(e)=>{handleInputChange(job?._id,"expired", e.target.value)}}>
                      <option value={true}>True
                      </option>
                      <option value={false}>False
                      </option>
                    </select>
                  </div>
                </div>
                <div className="long_field">
                  <div>
                    <span>Description:</span>
                    <textarea rows="5" disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.description} onChange={(e)=>{handleInputChange(job?._id,"description", e.target.value)}} />
                  </div>
                  <div>
                    <span>Location:</span>
                    <textarea rows="2" disabled = {editingMode !== job?._id ? true : false} 
                    value={job?.location} onChange={(e)=>{handleInputChange(job?._id,"location", e.target.value)}} />
                  </div>  
                </div>
              </div>
              <div className="button_wrapper">
                <div className="edit_btn_wrapper">
                {editingMode !== job?._id ? (
                <>
                  <button className="check_btn" onClick={() => handleEnableEdit(job?._id)}>
                  <FaRegEdit />
                  </button>
                </>
              ) : (
                <>
                  <button className="check_btn" onClick={() => handleUpdateJob(job?._id)}>
                    <FaCheck />
                  </button>
                  <button className="check_btn" onClick={() => handleCancelEdit()}>
                   <RxCross2 />
                  </button>
                </>
              )}
                </div>
                <button className='delete_btn' onClick={() => handleDeleteJob(job?._id)}><FaTrash/></button>
              </div>
            </div>
          )
        )}
      </div>
    )
  





  return (
   <div className="myJobs page">
    <div className="container">
      <h6>Your Posted Jobs</h6>
      {
       myJobs && myJobs.length>0 ? (
        <>
        {displayingJobs()}

        </>
        ) : (<p>You've not posted any job or may be you deleted all of your jobs!</p>)
      }
    </div>
   </div>
  )
}

export default MyJobs