import React, { useState, useContext,useEffect} from 'react';
import { Context } from "../../main";
import { useNavigate,useParams} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; 

const Application = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const { isAuthorized,user } = useContext(Context);
  const navigateTo = useNavigate();


  useEffect(() => {
    if (!isAuthorized) {
      navigateTo('/login');
    }
    if (isAuthorized && user.role !== 'Job Seeker') {
      toast.error(`${user.role} can't access Application.`);
      navigateTo('/');
    }
  }, [isAuthorized, user]);

  const handleFileChange = (e)=>{
    const resumeFile = e.target.files[0];
    setResume(resumeFile);

  }

  const {id} = useParams();

  const handleApplication = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("coverLetter",coverLetter);
    formData.append("phone",phone);
    formData.append("address",address);
    formData.append("resume",resume);
    formData.append("jobID",id);

    await console.log(formData)
    

    try {
      const response = await axios.post("https://nice-rose-capybara-cape.cyclic.app/api/v1/application/submitapplication",formData,
      {withCredentials:true,
      headers : {
        "Content-Type": "multipart/form-data",
      }})

      await console.log(response)

      setShowConfetti(true)

      
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCoverLetter("");
      setResume(null);
      toast.success(response.data.message);
      
      navigateTo("/job/getalljobs")

      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
      
    }

  }




  return (
    <section className='application'>
      <div className="container">
        <h5>Application Form</h5>
        <form onSubmit={handleApplication}>
          <input type="text"  value = {name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name'/>
          <input type="text"  value = {email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/>
          <input type="number"  value = {phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder="Phone"/>
          <input type="text"  value = {address} onChange={(e)=>{setAddress(e.target.value)}} placeholder='Address'/>
          <textarea value = {coverLetter} onChange={(e)=>{setCoverLetter(e.target.value)}} placeholder='Coverletter'/>
          <div>
            <label>Select Resume</label>
            <input type="file" accept=".png, .jpg, .webp" onChange={handleFileChange} />
          </div>
          <button type="submit">Submit Application</button>

        </form>
      </div>

    </section>
  )
}

export default Application