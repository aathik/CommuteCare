import React from 'react'
import { useLocation } from 'react-router-dom';
import ForgotPasswordPage from '../Components/ForgotPasswordPage'
import NavBar from '../Components/NavBar'


const ForgotPassword = () => {
  const location = useLocation();
  console.log(location.state.userType)
  return (
    <div>
        <NavBar />
        <ForgotPasswordPage data={location.state.userType}/>
    </div>
  )
}

export default ForgotPassword