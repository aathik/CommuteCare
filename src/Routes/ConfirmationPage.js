import React from 'react'
import Booked from '../Components/Booked'
import NavBar from '../Components/NavBar'
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {

    

    const location = useLocation();
    console.log("Page: ", window.location.pathname); 
 // /*
 
  //  */
  return (
    <div>
        <NavBar />
        <Booked PersonName={location.state.person.name.firstname + ' ' + location.state.person.name.lastname} 
        PersonEmail={location.state.person.email} 
        PersonMob = {location.state.person.mob}/>
    </div>
  )
}

export default ConfirmationPage