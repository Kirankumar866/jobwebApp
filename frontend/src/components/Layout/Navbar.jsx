import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from 'react-icons/gi';
import Popup from 'reactjs-popup'; // Import Popup component
import './Navbar.css'; // Import CSS file for styling (define styles for hamburger menu and popup)

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/user/logout', { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo('/login');
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? 'navbarShow' : 'navbarHide'}>
      <div className="container">
        <Link to="/" className="logo">
          <img src="/JobZee-logos__white.png" alt="logo" />
        </Link>
        {/* Use show state to conditionally render menu or show-menu */}
        <ul className={!show ? 'menu' : 'menuHide'}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              <h6>Home</h6>
            </Link>
          </li>
          <li>
            <Link to="/job/getalljobs" onClick={() => setShow(false)}>
              <h6>Jobs</h6>
            </Link>
          </li>
          <li>
            <Link to="/application/my" onClick={() => setShow(false)}>
              <h6>{user && user.role === 'Employer' ? "APPLICANT'S APPLICATIONS" : 'MY APPLICATIONS'}</h6>
            </Link>
          </li>
          {user && user.role === 'Employer' && (
            <>
              <li>
                <Link to="/job/postjob" onClick={() => setShow(false)}>
                  <h6>POST NEW JOB</h6>
                </Link>
              </li>
              <li>
                <Link to="/job/my" onClick={() => setShow(false)}>
                  <h6>VIEW YOUR JOBS</h6>
                </Link>
              </li>
            </>
          )}
          <li>
            <button onClick={handleLogout}>
              <h6>Logout</h6>
            </button>
          </li>
        </ul>
        {/* Render hamburger menu icon with onClick to toggle show state */}
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>

      {/* Responsive Popup/Modal using reactjs-popup */}
      <Popup open={show} onClose={() => setShow(false)} modal nested>
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="popup-menu">
              <Link to="/" onClick={() => setShow(false)}>
                <h6>Home</h6>
              </Link>
              <Link to="/job/getalljobs" onClick={() => setShow(false)}>
                <h6>Jobs</h6>
              </Link>
              <Link to="/application/my" onClick={() => setShow(false)}>
                <h6>{user && user.role === 'Employer' ? "APPLICANT'S APPLICATIONS" : 'MY APPLICATIONS'}</h6>
              </Link>
              {user && user.role === 'Employer' && (
                <>
                  <Link to="/job/postjob" onClick={() => setShow(false)}>
                    <h6>POST NEW JOB</h6>
                  </Link>
                  <Link to="/job/my" onClick={() => setShow(false)}>
                    <h6>VIEW YOUR JOBS</h6>
                  </Link>
                </>
              )}
              <button onClick={handleLogout}>
                <h6>Logout</h6>
              </button>
            </div>
          </div>
        )}
      </Popup>
    </nav>
  );
};

export default Navbar;
