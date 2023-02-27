import React from 'react'
import LoginChoice from '../Components/LoginChoice'
import NavBar from '../Components/NavBar'
import CustomerHome from './CustomerHome';


const Home = () => {
  
  const userLoggedIn = localStorage.getItem('LoggedIn');
  
  
 
  return (
    <div>
      <NavBar />
      {userLoggedIn? <CustomerHome /> : <LoginChoice />}
    
    </div>
  ) 
}

export default Home