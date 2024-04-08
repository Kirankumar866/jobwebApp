import React from 'react'
import {FaMicrosoft,FaApple,FaGoogle} from "react-icons/fa"
import {SiTesla} from "react-icons/si"


const companies = [
  {
    id: 1,
    title: "Microsoft",
    location: "Silicon valley, Los Angeles",
    openPositions: 10,
    icon: <FaMicrosoft />,
  },
  {
    id: 2,
    title: "Tesla",
    location: "West Dodge, Omaha",
    openPositions: 5,
    icon: <SiTesla />,
  },
  {
    id: 3,
    title: "Apple",
    location: "Baltimore county, New Jersey",
    openPositions: 20,
    icon: <FaApple />,
  },
  {
    id: 4,
    title: "Google",
    location: "Fire Wall Avenue, Kansas",
    openPositions: 18,
    icon: <FaGoogle />,
  },
  
];

const PopularCompanies = () => {
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
        {
          companies.map((each)=>
          (
            <div className="card" key={each.id}>
              <div className="content">
                  <div className="icon">
                    {each.icon}
                  </div>
                  <div className="text">
                    <p>{each.title}</p>
                    <p>{each.location}</p>
                  </div>
              </div>
              <button>Open Postions {each.openPositions}</button>

            </div>
            )
          
          )
        }
        </div>
      </div>
    </div>
  )
}

export default PopularCompanies