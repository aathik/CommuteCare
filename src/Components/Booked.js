import React from 'react';
import './Booked.css';
import { TiTick } from "react-icons/ti";

const Booked = () => {
  return (
    <div className='booked'>
      <div className='booked-container'>
        <div className='booked-content'>
          <h1>Your booking has been confirmed !</h1>
          <TiTick size={100} style={{color: "green"}}/>
        </div>
      </div>
    </div>
    
  )
}

export default Booked