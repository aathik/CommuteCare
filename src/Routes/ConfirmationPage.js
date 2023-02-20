import React, {useEffect} from 'react'
import Booked from '../Components/Booked'
import NavBar from '../Components/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
    const location = useLocation();
    console.log("Page: ", window.location.href ); 
    const navigate = useNavigate();

    useEffect(() => {

      const backButtonCheck = (event) => {
        if(window.location.pathname === '/availableHelpers'){
          console.log("true");
          navigate(-2); 
        }
      };
      
      window.addEventListener("popstate",backButtonCheck)
      return () => {
        window.removeEventListener('beforeunload', backButtonCheck);
      }
    }, [navigate])
    
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