import React, { useState, useContext,useEffect} from 'react';
import { Context } from "../../main";
import { useNavigate,Link} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; 



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
const countries = [
  { id: 1, name: "Afghanistan" },
  { id: 2, name: "Albania" },
  { id: 3, name: "Algeria" },
  { id: 4, name: "Andorra" },
  { id: 5, name: "Angola" },
  { id: 6, name: "Antigua and Barbuda" },
  { id: 7, name: "Argentina" },
  { id: 8, name: "Armenia" },
  { id: 9, name: "Australia" },
  { id: 10, name: "Austria" },
  { id: 11, name: "Azerbaijan" },
  { id: 12, name: "Bahamas" },
  { id: 13, name: "Bahrain" },
  { id: 14, name: "Bangladesh" },
  { id: 15, name: "Barbados" },
  { id: 16, name: "Belarus" },
  { id: 17, name: "Belgium" },
  { id: 18, name: "Belize" },
  { id: 19, name: "Benin" },
  { id: 20, name: "Bhutan" },
  { id: 21, name: "Bolivia" },
  { id: 22, name: "Bosnia and Herzegovina" },
  { id: 23, name: "Botswana" },
  { id: 24, name: "Brazil" },
  { id: 25, name: "Brunei" },
  { id: 26, name: "Bulgaria" },
  { id: 27, name: "Burkina Faso" },
  { id: 28, name: "Burundi" },
  { id: 29, name: "Cabo Verde" },
  { id: 30, name: "Cambodia" },
  { id: 31, name: "Cameroon" },
  { id: 32, name: "Canada" },
  { id: 33, name: "Central African Republic" },
  { id: 34, name: "Chad" },
  { id: 35, name: "Chile" },
  { id: 36, name: "China" },
  { id: 37, name: "Colombia" },
  { id: 38, name: "Comoros" },
  { id: 39, name: "Congo (Congo-Brazzaville)" },
  { id: 40, name: "Costa Rica" },
  { id: 41, name: "Croatia" },
  { id: 42, name: "Cuba" },
  { id: 43, name: "Cyprus" },
  { id: 44, name: "Czechia (Czech Republic)" },
  { id: 45, name: "Democratic Republic of the Congo" },
  { id: 46, name: "Denmark" },
  { id: 47, name: "Djibouti" },
  { id: 48, name: "Dominica" },
  { id: 49, name: "Dominican Republic" },
  { id: 50, name: "Ecuador" },
  { id: 51, name: "Egypt" },
  { id: 52, name: "El Salvador" },
  { id: 53, name: "Equatorial Guinea" },
  { id: 54, name: "Eritrea" },
  { id: 55, name: "Estonia" },
  { id: 56, name: "Eswatini (fmr. 'Swaziland')" },
  { id: 57, name: "Ethiopia" },
  { id: 58, name: "Fiji" },
  { id: 59, name: "Finland" },
  { id: 60, name: "France" },
  { id: 61, name: "Gabon" },
  { id: 62, name: "Gambia" },
  { id: 63, name: "Georgia" },
  { id: 64, name: "Germany" },
  { id: 65, name: "Ghana" },
  { id: 66, name: "Greece" },
  { id: 67, name: "Grenada" },
  { id: 68, name: "Guatemala" },
  { id: 69, name: "Guinea" },
  { id: 70, name: "Guinea-Bissau" },
  { id: 71, name: "Guyana" },
  { id: 72, name: "Haiti" },
  { id: 73, name: "Holy See" },
  { id: 74, name: "Honduras" },
  { id: 75, name: "Hungary" },
  { id: 76, name: "Iceland" },
  { id: 77, name: "India" },
  { id: 78, name: "Indonesia" },
  { id: 79, name: "Iran" },
  { id: 80, name: "Iraq" },
  { id: 81, name: "Ireland" },
  { id: 82, name: "Israel" },
  { id: 83, name: "Italy" },
  { id: 84, name: "Jamaica" },
  { id: 85, name: "Japan" },
  { id: 86, name: "Jordan" },
  { id: 87, name: "Kazakhstan" },
  { id: 88, name: "Kenya" },
  { id: 89, name: "Kiribati" },
  { id: 90, name: "Kuwait" },
  { id: 91, name: "Kyrgyzstan" },
  { id: 92, name: "Laos" },
  { id: 93, name: "Latvia" },
  { id: 94, name: "Lebanon" },
  { id: 95, name: "Lesotho" },
  { id: 96, name: "Liberia" },
  { id: 97, name: "Libya" },
  { id: 98, name: "Liechtenstein" },
  { id: 99, name: "Lithuania" },
  { id: 100, name: "Luxembourg" },
  { id: 101, name: "Madagascar" },
  { id: 102, name: "Malawi" },
  { id: 103, name: "Malaysia" },
  { id: 104, name: "Maldives" },
  { id: 105, name: "Mali" },
  { id: 106, name: "Malta" },
  { id: 107, name: "Marshall Islands" },
  { id: 108, name: "Mauritania" },
  { id: 109, name: "Mauritius" },
  { id: 110, name: "Mexico" },
  { id: 111, name: "Micronesia" },
  { id: 112, name: "Moldova" },
  { id: 113, name: "Monaco" },
  { id: 114, name: "Mongolia" },
  { id: 115, name: "Montenegro" },
  { id: 116, name: "Morocco" },
  { id: 117, name: "Mozambique" },
  { id: 118, name: "Myanmar (formerly Burma)" },
  { id: 119, name: "Namibia" },
  { id: 120, name: "Nauru" },
  { id: 121, name: "Nepal" },
  { id: 122, name: "Netherlands" },
  { id: 123, name: "New Zealand" },
  { id: 124, name: "Nicaragua" },
  { id: 125, name: "Niger" },
  { id: 126, name: "Nigeria" },
  { id: 127, name: "North Korea" },
  { id: 128, name: "North Macedonia (formerly Macedonia)" },
  { id: 129, name: "Norway" },
  { id: 130, name: "Oman" },
  { id: 131, name: "Pakistan" },
  { id: 132, name: "Palau" },
  { id: 133, name: "Palestine State" },
  { id: 134, name: "Panama" },
  { id: 135, name: "Papua New Guinea" },
  { id: 136, name: "Paraguay" },
  { id: 137, name: "Peru" },
  { id: 138, name: "Philippines" },
  { id: 139, name: "Poland" },
  { id: 140, name: "Portugal" },
  { id: 141, name: "Qatar" },
  { id: 142, name: "Romania" },
  { id: 143, name: "Russia" },
  { id: 144, name: "Rwanda" },
  { id: 145, name: "Saint Kitts and Nevis" },
  { id: 146, name: "Saint Lucia" },
  { id: 147, name: "Saint Vincent and the Grenadines" },
  { id: 148, name: "Samoa" },
  { id: 149, name: "San Marino" },
  { id: 150, name: "Sao Tome and Principe" },
  { id: 151, name: "Saudi Arabia" },
  { id: 152, name: "Senegal" },
  { id: 153, name: "Serbia" },
  { id: 154, name: "Seychelles" },
  { id: 155, name: "Sierra Leone" },
  { id: 156, name: "Singapore" },
  { id: 157, name: "Slovakia" },
  { id: 158, name: "Slovenia" },
  { id: 159, name: "Solomon Islands" },
  { id: 160, name: "Somalia" },
  { id: 161, name: "South Africa" },
  { id: 162, name: "South Korea" },
  { id: 163, name: "South Sudan" },
  { id: 164, name: "Spain" },
  { id: 165, name: "Sri Lanka" },
  { id: 166, name: "Sudan" },
  { id: 167, name: "Suriname" },
  { id: 168, name: "Sweden" },
  { id: 169, name: "Switzerland" },
  { id: 170, name: "Syria" },
  { id: 171, name: "Tajikistan" },
  { id: 172, name: "Tanzania" },
  { id: 173, name: "Thailand" },
  { id: 174, name: "Timor-Leste" },
  { id: 175, name: "Togo" },
  { id: 176, name: "Tonga" },
  { id: 177, name: "Trinidad and Tobago" },
  { id: 178, name: "Tunisia" },
  { id: 179, name: "Turkey" },
  { id: 180, name: "Turkmenistan" },
  { id: 181, name: "Tuvalu" },
  { id: 182, name: "Uganda" },
  { id: 183, name: "Ukraine" },
  { id: 184, name: "United Arab Emirates" },
  { id: 185, name: "United Kingdom" },
  { id: 186, name: "United States of America" },
  { id: 187, name: "Uruguay" },
  { id: 188, name: "Uzbekistan" },
  { id: 189, name: "Vanuatu" },
  { id: 190, name: "Venezuela" },
  { id: 191, name: "Vietnam" },
  { id: 192, name: "Yemen" },
  { id: 193, name: "Zambia" },
  { id: 194, name: "Zimbabwe" },
  { id: 195, name: "Serbia" },
  { id: 196, name: "Netherlands" }
];


const PostJob = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized,user } = useContext(Context);
  const navigateTo = useNavigate();


  useEffect(() => {
    if (!isAuthorized) {
      navigateTo('/login');
    }

    if (isAuthorized && user.role !== 'Employer') {
      toast.error(`${user.role} does not have permission to post jobs.`);
      navigateTo('/');
    }
  }, [isAuthorized, user, navigateTo]);

  const handlePost = async(e)=>{
    e.preventDefault();
    let payload = {
      title,
      description,
      category,
      country,
      city,
      location,
    };
  
    if (salaryType === "Fixed Salary") {
      payload = {
        ...payload,
        fixedSalary,
      };
    } else if (salaryType === "Ranged Salary") {
      payload = {
        ...payload,
        salaryFrom,
        salaryTo,
      };
    }

    
    await axios.post("http://localhost:5000/api/v1/job/postjob",payload,

       {
        withCredentials:true, 
        headers : {
          "Content-Type": "application/json"
        }
        })
        .then((res)=>{
          toast.success(res.data.message)
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");

        }).catch((error)=>{
          toast.error(error.response.data.message);
        })
      

    
  }

  



  return (
    <>
    <div className="job_post page">
      <div className="container">
        <h5>POST NEW JOB</h5>
        <form onSubmit={handlePost} >
          <div className="wrapper">
            <input type="text"  value = {title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Job Title'/>
            <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
              <option value="">Select Category</option>
              {
                categories.map((eachCategory)=> <option value= {eachCategory.title} key={eachCategory.id}>{eachCategory.title}</option>)
              }
            </select>
          </div>
          <div className="wrapper">
            <select value={country} onChange={(e)=>{setCountry(e.target.value)}}>
              <option value="" >Select Country</option>
              {
                countries.map((eachCountry)=> <option value= {eachCountry.name} key={eachCountry.id}>{eachCountry.name}</option>)
              }
            </select>
            <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder='City'/>
            <input type="text" value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder='Location'/>
            
          </div>
          
            
            
          
          <div className="salary_wrapper">
            <select value={salaryType} onChange={(e)=>{setSalaryType(e.target.value)}}>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div>
              {
              salaryType === "default" ? (<p color='red'>Please provide salaryType*</p>): 
              (salaryType==="Fixed Salary" ? 
              (<input type='number' placeholder="Enter Fixed Salary" value={fixedSalary} onChange={(e)=>{setFixedSalary(e.target.value)}}/>):
              (<div className='ranged_salary'>
                <input type='number' placeholder="SalaryFrom" value={salaryFrom} onChange={(e)=>{setSalaryFrom(e.target.value)}}/>
                <input type='number' placeholder="SalaryTo" value={salaryTo} onChange={(e)=>{setSalaryTo(e.target.value)}}/>
              </div>)

              )
              }
            </div>
          </div>
          <textarea rows="10" value={description} onChange={(e)=>{setDescription(e.target.value)} } placeholder='Job Description'/>
          <button type="submit">Create Job</button>




        </form>
      </div>
    </div>
    </>
    
  )
}

export default PostJob