import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../../main";
import { useNavigate,Link} from "react-router-dom";
import axios from "axios"; 

const PostJob = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();


  if (!isAuthorized) {
    navigateTo("/login");
  }

  const handlePost = async(e)=>{
    e.preventDefault();


  }
  


  return (
    <div>PostJob</div>
  )
}

export default PostJob