import React, {useContext, useState} from 'react'
import {Context} from "../../main"
import {Link,Navigate} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import {FaRegUser} from "react-icons/fa"
import {MdOutlineMailOutline} from "react-icons/md"

import {RiRocket2Fill} from "react-icons/ri"

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState();

  const {isAuthorized,setIsAuthorized} = useContext(Context);

  const handleLogin = async (e)=>{
    e.preventDefault();
    console.log("entered handleLogin")
    try {
      const response = await axios.post("https://jobweb-app.vercel.app/api/v1/user/login",
      {email,password,role},
      {
        withCredentials:true, 
        headers : {
          "Content-Type": "application/json"
        }
        }
      )
      console.log("response",response)
      toast.success(response.data.message)
      setIsAuthorized(true)
      setEmail("");
      setPassword("");
      setRole("");
      
      
    } catch (error) {

      toast.error(error.response.data.message);
      setIsAuthorized(false)
      console.log("error", error)

      
    }
  }
  console.log("isAuthorized", isAuthorized)

  if(isAuthorized){
    
    return <Navigate to="/" />

  }

  const loginForm = ()=>(
    <form>
        <div className="inputTag">
          <label> Email Address</label>
          <div>
            <input type="email" value = {email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email Address"/>
            <MdOutlineMailOutline/>
          </div>
        </div>
        <div className="inputTag">
          <label> Password</label>
          <div>
            <input type="password" value = {password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"/>
            <RiRocket2Fill/>
          </div>
        </div>
        <div className="inputTag">
          <label> Role</label>
          <div>
            <select value = {role} onChange={(e)=>setRole(e.target.value)}>
              <option value = "Select Role">Select Role</option>
              <option value = "Employer" >Employer</option>
              <option value = "Job Seeker">Job Seeker</option>
            </select>
            <FaRegUser/>
          </div>
        </div>
        <button type="submit" onClick = {handleLogin}>Login</button>
        <Link to="/Register">Register Now!!</Link>

      </form>

  )


  return (
   <>
   <div className="authPage">
    <div className="container">
      <div className="header">
        <img src = "/JobZeelogo.png" alt = "logo"/>
        <h3>Login Your Account</h3>
      </div>
      {loginForm()}
    </div>
    <div className="banner">
      <img src="/login.png" alt="login"/>
    </div>
   </div>
   </>
  )
}

export default Login