import React from 'react'
import LoginPage from '../Components/LoginPage'
import NavBar from '../Components/NavBar'
import { useLocation } from "react-router-dom";



const Login = () => {
  
  const location = useLocation();
 
  
  //console.log("State:", location.state.data)
  return (
    <div>
        <NavBar />
        <LoginPage data={location.state.data}/>
        
        
    </div>
  )
}

export default Login