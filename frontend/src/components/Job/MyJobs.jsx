import React, { useState, useContext,useEffect} from 'react';
import { Context } from "../../main";
import { useNavigate,Link} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; 


const MyJobs = () => {

  const [myJobs, setMyJobs] = useState([]);

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

  },[])
  




  return (
    <div>MyJobs</div>
  )
}

export default MyJobs