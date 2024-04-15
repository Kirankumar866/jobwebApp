import React, {useContext, useState} from 'react'
import {Context} from "../../main"
import {Link,Navigate} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import {FaPencilAlt, FaRegUser} from "react-icons/fa"
import {MdOutlineMailOutline} from "react-icons/md"
import {FaPhoneFlip} from "react-icons/fa6"
import {RiRocket2Fill} from "react-icons/ri"

const Register = () => {
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [role,setRole] = useState("Employer");

  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context);

  const handleRegister = async (e)=>{
    e.preventDefault();
    console.log("entered handleRegister")
    try {
      const response = await axios.post("https://weak-moth-belt.cyclic.app/api/v1/user/register",
      {name,email,password,phone,role},
      {
        withCredentials:true, 
        headers : {
          "Content-Type": "application/json"
        }
        }
      )
      console.log(response)
      toast.success(response.data.message)
      setEmail("");
      setName("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true)
      
    } catch (error) {

      toast.error(error.response.data.message);
      setIsAuthorized(false)
      console.log(error)

      
    }
  }
  

  if(isAuthorized){
    
    return <Navigate to="/" />

  }

  const registerForm = ()=>(
    <form>
        <div className="inputTag">
          <label> Register As</label>
          <div>
            <select value = {role} onChange={(e)=>setRole(e.target.value)}>
              <option value = "Select Role" disabled>Select Role</option>
              <option value = "Employer" >Employer</option>
              <option value = "Job Seeker">Job Seeker</option>
            </select>
            <FaRegUser/>
          </div>
        </div>
        <div className="inputTag">
          <label> Name</label>
          <div>
            <input type="text" value = {name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name"/>
            <FaPencilAlt/>
          </div>
        </div>
        <div className="inputTag">
          <label> Email Address</label>
          <div>
            <input type="email" value = {email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email Address"/>
            <MdOutlineMailOutline/>
          </div>
        </div>
        <div className="inputTag">
          <label> Phone</label>
          <div>
            <input type="number" value = {phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Your Phone Number"/>
            <FaPhoneFlip/>
          </div>
        </div>
        <div className="inputTag">
          <label> Password</label>
          <div>
            <input type="password" value = {password} onChange={(e)=>setPassword(e.target.value)} placeholder="Set Password"/>
            <RiRocket2Fill/>
          </div>
        </div>
        <button type="submit" onClick = {handleRegister}>Register</button>
        <Link to="/login">Login Now!!</Link>

      </form>

  )


  return (
   <>
   <div className="authPage">
    <div className="container">
      <div className="header">
        <img src = "/JobZeelogo.png" alt = "logo"/>
        <h3>Create a new account</h3>
      </div>
      {registerForm()}
    </div>
    <div className="banner">
      <img src="/register.png" alt="register"/>
    </div>
   </div>
   </>
  )
}

export default Register