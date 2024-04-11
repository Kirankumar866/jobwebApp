import React from 'react'
import {Link} from "react-router-dom"

const NotFound = () => {
  return (
    <div className='content'>  
            <img src="/notfound.png" alt = "Not Found" />
            <Link path="/">Return to Home</Link>

        
    </div>
  )
}

export default NotFound