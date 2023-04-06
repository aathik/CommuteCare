import React from 'react'
import Reservation from '../Components/Reservation'
import NavBar from '../Components/NavBar'
import { Navigate } from 'react-router-dom';
import Footer from '../Components/Footer';


/**
 * *Customer Home Page
 * *This is where the user can enter the time date and other details required to book the helpers
 * 
 */


const Customer = () => {
  const userLoggedIn = localStorage.getItem('LoggedIn');
  return (
    <div>
      
      {!userLoggedIn ? <Navigate to='/' /> :<>
        <NavBar />
        <Reservation />
        <Footer />
       </>}
      
    </div>
  )
}

export default Customer