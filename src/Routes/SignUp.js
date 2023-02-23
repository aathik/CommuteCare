import React from 'react'
import SignUpPage from '../Components/SignUpPage'
import NavBar from '../Components/NavBar'
import { useLocation } from 'react-router-dom';

const SignUp = () => {
  const location = useLocation();
  return (
    <div>
        <NavBar />
        <SignUpPage data={location.state.userType}/>
    </div>
  )
}

export default SignUp