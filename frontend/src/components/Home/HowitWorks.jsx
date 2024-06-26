import React from 'react';
import {FaUser} from "react-icons/fa";
import {MdFindInPage} from "react-icons/md";
import {IoMdSend} from "react-icons/io";
import {Link} from "react-router-dom"

const HowitWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How JobZee Works</h3>
        <div className="banner">
          <div className="card">
            <FaUser/>
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus voluptatibus tempore 
              perspiciatis beatae minima odit impedit corrupti quasi sapiente, 
              corporis ut aut facilis aliquam animi provident, 
              debitis modi voluptas sequi.</p>

          </div>
          <Link to = "/job/getalljobs" className="card" >
            <MdFindInPage />
            <p>Find a Job</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus voluptatibus tempore 
              perspiciatis beatae minima odit impedit corrupti quasi sapiente, 
              corporis ut aut facilis aliquam animi provident, 
              debitis modi voluptas sequi.</p>
              
          </Link>
          <Link to = "/job/getalljobs" className="card">
            <IoMdSend/>
            <p>Apply Job</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus voluptatibus tempore 
              perspiciatis beatae minima odit impedit corrupti quasi sapiente, 
              corporis ut aut facilis aliquam animi provident, 
              debitis modi voluptas sequi.</p>
              
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HowitWorks