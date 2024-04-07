import React, {useContext, useState} from 'react'
import {Context} from "../../main"
import { useNavigate,Link} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
    const [show,setShow] = useState(false);
    const {isAuthorized, setIsAuthorized,user} = useContext(Context);
    const navigateTo = useNavigate();
  

    const handleLogout = async ()=>{
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user/logout",{withCredentials: true});
        console.log(response.data)
        toast.success(response.data.message);
        setIsAuthorized(false);
        navigateTo("/login");
        
      } catch (error) {
        toast.error(response.data.message);
        setIsAuthorized(true);
        
      }
    }

  return (
    <>
    <nav className={isAuthorized? "navbarShow": "navbarHide"}>
      <div className='container'>
        <div className='logo'>
          <img src = "/JobZee-logos__white.png" alt = "logo"/>
        </div>
        <ul className= {!show? "menu" : "show-menu menu"}>
          <li>
            <Link to = "/" onClick={()=>{setShow(false)}}>Home</Link> 
          </li>
          <li>
          <Link to = "/job/getalljobs" onClick={()=>{setShow(false)}}>Jobs</Link>
          </li>
          <li>
          <Link to = "/application/my" onClick={()=>{setShow(false)}}>
              {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>
          {
              user && user.role === "Employer"? (
                <>
                <li>
                <Link to = "/job/postjob" onClick={()=>{setShow(false)}}>POST NEW JOB</Link>
                </li>
                <li>
                <Link to = "/job/my" onClick={()=>{setShow(false)}}>VIEW YOUR JOBS</Link>
                </li>
                </>

              ): (
                <>
                <li>
                <h1>Not Developed yet</h1>
                </li>
                </>
              )
            }
            <button onClick={handleLogout}>Logout</button>
            <div className='hamburger'>
              <GiHamburgerMenu  onClick={()=>setShow(!show)}/>

            </div>



        </ul>

      </div>

    </nav>
    </>
  )
}

export default Navbar