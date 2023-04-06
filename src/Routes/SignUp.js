import React from 'react'
import SignUpPage from '../Components/SignUpPage'
import { useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';

/**
 * *Sign up page for both the user and helper
 * 
 */

const SignUp = () => {
  const location = useLocation();
  return (
    <div>
        <SignUpPage data={location.state.userType}/>
        <Footer />
    </div>
  )
}

export default SignUp