import React from 'react'
import { useLocation } from 'react-router-dom';
import ForgotPasswordPage from '../Components/ForgotPasswordPage'
import Footer from '../Components/Footer';

/**
 * *Forgot Password Page
 * *This page asks the user to enter the registered email of the user
 * *Calls the reset password feature
 * 
 */


const ForgotPassword = () => {
  const location = useLocation();
  console.log(location.state.userType)
  return (
    <div>
        <ForgotPasswordPage data={location.state.userType}/>
        <Footer />
    </div>
  )
}

export default ForgotPassword