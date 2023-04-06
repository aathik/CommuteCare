import React from 'react'
import { Navigate } from 'react-router-dom'
import LoginChoicePage from '../Components/LoginChoicePage'
import Footer from '../Components/Footer'

/**
 * *Page which prompts the user to help someone or if the user wants help
 * 
 */

const LoginChoice = () => {
  const userLoggedIn = localStorage.getItem('LoggedIn');
  const userType = localStorage.getItem('UserType');
  
  return (
    <div>
        {userLoggedIn ==='True'? <>
          { userType === 'Customer' && <Navigate to='/customer' />}
          { userType === 'Helper' && <Navigate to='/helperHome'/>}
          </> : <><LoginChoicePage /><Footer /></>}
    </div>
  )
}

export default LoginChoice