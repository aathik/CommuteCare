import React from 'react';
import './Booked.css';
import { TiTick } from "react-icons/ti";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import ReactLoading from 'react-loading';


const Booked = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setresult] = useState(""); 
  const [error, seterror] = useState("");
  const user = localStorage.getItem("User");

  //console.log(props.PersonId, props.Day,props.Time, props.Duration);


  useEffect(() => {
    setIsLoading(true);
    axios.post(`http://localhost:5000/book`,{
      helperId: props.PersonId,
      day: props.Day,
      starttime: props.Time,
      duration: props.Duration
    } 
    ,{
      headers: {
        Authorization : `Bearer ${JSON.parse(user)}` 
      }
    })
    .then(response => {
    setresult(response.data)
    //console.log(response)
    setIsLoading(false);
    })
    .catch(error => {
      console.error("Inside ",error.response.data);
      seterror(error.response.data)
      setIsLoading(false);
    });
    
    
  }, [props.PersonId, props.Day,props.Time, props.Duration, user]);
   
  return (
    
    <div className='booked'>
      { isLoading? <>
        <div className='loading'><ReactLoading type="spin" color="#000" />
        
        </div>
      </> :
      <div className='booked-container'>
        {error ? <span>Error: {error}</span> : <>
          {result === 'You have already booked a heper in this time slot' ? <>{result}</>:
          <div className='booked-content'>
            <h1>Your booking has been confirmed !</h1>
            <TiTick size={100} style={{color: "green"}}/>
            <p>Helper Name: {props.PersonName} </p>
            <p>Email Id: {props.PersonEmail}</p>
            <p>Mobile: {props.PersonMob}</p>
          </div>}
        
        </>} 
        
      </div>
      }
    </div>
    
  )
}

export default Booked