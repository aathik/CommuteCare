import React from 'react';
import './Booked.css';
import { TiTick } from "react-icons/ti";

const Booked = (props) => {
  return (
    <div className='booked'>
      <div className='booked-container'>
        <div className='booked-content'>
          <h1>Your booking has been confirmed !</h1>
          <TiTick size={100} style={{color: "green"}}/>
          <p>Helper Name: {props.PersonName} </p>
          <p>Email Id: {props.PersonEmail}</p>
          <p>Mobile: {props.PersonMob}</p>
        </div>
      </div>
    </div>
    
  )
}

export default Booked