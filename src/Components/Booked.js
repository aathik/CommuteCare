import React from 'react';
import './Booked.css';
import { TiTick } from "react-icons/ti";
import { useLocation } from 'react-router-dom';

const Booked = () => {

  const location = useLocation();
  console.log("Data:",location.state.person.name.firstname);
  const value = "true";

  return (
    <div className='booked'>
      <div className='booked-container'>
        <div className='booked-content'>
          <h1>Your booking has been confirmed !</h1>
          <TiTick size={100} style={{color: "green"}}/>
          <p>Helper Name: {location.state.person.name.firstname} {location.state.person.name.lastname  }</p>
          <p>Email Id: {location.state.person.email}</p>
          <p>Mobile: {location.state.person.mob}</p>
        </div>
      </div>
    </div>
    
  )
}

export default Booked