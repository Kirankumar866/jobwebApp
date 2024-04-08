import React from 'react';
import {FaSuitcase,FaBuilding, FaUsers, FaUserPlus} from "react-icons/fa";


const details = [
  {
    id: 1,
    title: "1,23,441",
    subTitle: "Live Job",
    icon: <FaSuitcase />,
  },
  {
    id: 2,
    title: "91,220",
    subTitle: "Companies",
    icon: <FaBuilding />,
  },
  {
    id: 3,
    title: "2,34,200",
    subTitle: "Job Seekers",
    icon: <FaUsers />,
  },
  {
    id: 4,
    title: "1,03,761",
    subTitle: "Employers",
    icon: <FaUserPlus />,
  },
];

const HeroSection = () => {
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a job that suits</h1>
          <h1>your interest and skills</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Eaque minima repudiandae consequatur itaque blanditiis 
            molestiae pariatur rem at fuga debitis mollitia, cum laborum, 
            voluptates rerum. Asperiores voluptates 
            saepe voluptatem adipisci?</p>
        </div>
        <div className="image">
          <img src="heroS.jpg" alt="hero"/>
        </div>
      </div>
      <div className="details">
        {
          details.map((each)=>(
            
            <div className='card' key= {each.id}>
              <div className="icon">{each.icon}</div>
              <div className="content">
                <p>{each.title}</p>
                <p>{each.subTitle}</p>
              </div>

            </div>
            
          )
            )
        }
      </div>
    </div>
   
  )
}

export default HeroSection