import React from 'react'
import {Link} from "react-router-dom"

const NotFound = () => {
  return (
    <>  
            <img src="/pageNotFound.jpg" alt = "Not Found" width={500}/>
            <Link path="/">Return to Home</Link>

        
    </>
  )
}

export default NotFound