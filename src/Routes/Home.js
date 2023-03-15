import React from 'react'
import { Navigate } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import NavBar from '../Components/NavBar'
// import CustomerHome from './CustomerHome';
// import HelperHome from './HelperHome';


const Home = () => {
  
  const userLoggedIn = localStorage.getItem('LoggedIn');
  const userType = localStorage.getItem('UserType');
  console.log("User:", userType)
  
 
  return (
    <div>
      {userLoggedIn === 'true'? <>
      { userType === 'Customer' && <Navigate to='/customerHome' />}
      { userType === 'Helper' && <Navigate to='/helperHome'/>}
      </> :
      <HomePage />
      }
    
    </div>
  ) 
}

export default Home