import React from 'react'
import LoginCustomerPage from '../Components/LoginCustomerPage'
import NavBar from '../Components/NavBar'
import { useLocation } from "react-router-dom";
import LoginHelperPage from '../Components/LoginHelperPage';


const Login = () => {
  
  const location = useLocation();
 
  
  console.log("State:", location.state.data)
  return (
    <div>
        <NavBar />
        {location.state.data ? <>
        <LoginCustomerPage /> </> : <>
        <LoginHelperPage /> </>
        
        }
    </div>
  )
}

export default Login