import React, {useContext, useEffect}from 'react';
import {Context} from "./main"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer"
import Home from "./components/Home/Home"
import Jobs from "./components/Job/Jobs"
import JobDetails from "./components/Job/JobDetails"
import MyJobs from "./components/Job/MyJobs"
import PostJob from "./components/Job/PostJob"
import Application from './components/Application/Application';
import MyApplications from './components/Application/MyApplications';
import NotFound from './components/NotFound/NotFound';
import axios from "axios";
import {Toaster} from "react-hot-toast"



const App = () => {

  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context);

  useEffect(()=>{
    const fetchUser  = async()=>{
      
      try {
        const {data} = await axios.get("https://good-yak-parka.cyclic.app/api/v1/user/getuser",{withCredentials:true});
        setUser(data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false)
        console.error("Error fetching user:", error);
        
      }
    }
    fetchUser();
    

  },[isAuthorized])
  

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route    path = "/login" Component = {Login}/>
        <Route exact path = "/register" Component = {Register}/>
        <Route exact path = "/" Component = {Home}/>
        <Route exact path = "/job/getalljobs" Component = {Jobs}/>
        <Route exact path = "/jobdetails/:id" Component = {JobDetails}/>
        <Route exact path = "/job/postjob" Component = {PostJob}/>
        <Route exact path = "/job/my" Component = {MyJobs}/>
        <Route exact path = "/application/:id" Component = {Application}/>
        <Route exact path = "/application/my" Component = {MyApplications}/>
        <Route path = "*" element = {<NotFound/>} />
      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
    </>
  )
}

export default App