import React from 'react'
import { useLocation } from 'react-router-dom';
import EmailVerificationPage from '../Components/EmailVerificationPage'

import Footer from '../Components/Footer';

/**
 * *Email Verification Page
 * *This page is used to verify the OTP that is sent to the user's email upon successful registration
 * 
 */



const EmailVerification = () => {
  const location = useLocation();
  return (
    <div>
      
      <EmailVerificationPage data={location.state.data}/>
      <Footer />
    </div>
  )
}

export default EmailVerification