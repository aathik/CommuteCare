import React from 'react'
import { Navigate } from 'react-router-dom';
import LoginChoice from '../Components/LoginChoicePage'
import NavBar from '../Components/NavBar'
// import CustomerHome from './CustomerHome';
// import HelperHome from './HelperHome';


const Home = () => {
  
  const userLoggedIn = localStorage.getItem('LoggedIn');
  const userType = localStorage.getItem('UserType');
  console.log("User:", userType)
  
 
  return (
    <div>
      <NavBar />
      {userLoggedIn === 'true'? <>
      { userType === 'Customer' && <Navigate to='/customerHome' />}
      { userType === 'Helper' && <Navigate to='/helperHome'/>}
      </> : <LoginChoice />}
    
    </div>
  ) 
}

export default Home