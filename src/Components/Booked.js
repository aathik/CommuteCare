import React from 'react';
import './Booked.css';
import { TiTick } from "react-icons/ti";
import { useEffect } from 'react';
import { useState } from 'react';

import { bookingHelper, logout } from '../Routes/Login/AuthService';

import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';


const Booked = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setresult] = useState(""); 
  const [error, seterror] = useState("");

  const navigate = useNavigate();

  const [jwtError, setjwtError] = useState("");

  //console.log(props.PersonId, props.Day,props.Time, props.Duration);


  useEffect(() => {

    const fetchData = async () => {
      try {
          setIsLoading(true);
          await bookingHelper(props.PersonId, props.Day, props.Time, props.Duration).then(
            (response) => {
              setresult(response.data)
            }
          );
          console.log("Response:",result);
        } catch (error) {
          console.error("Inside ",error.response.data);
          seterror(error.response.data)
          console.error('error', error);
          setjwtError(error.response.data.message);
          
          if(jwtError==="jwt expired" || jwtError==='jwt malformed'){
            console.log("Hello")
            logout();
            navigate('/');
          }
          setIsLoading(false);
        }
        setIsLoading(false);
    }
    
    fetchData();
    
    
  }, []);
   
  return (
    
    <div className='booked'>
      { isLoading? <>
        <div className='loading'><ReactLoading type="spin" color="#000" />
        
        </div>
      </> :
      <div className='booked-container'>
        {error ? <span>Error: {error}</span> : <>
          {result === 'You have already booked a helper in this time slot' || result === 'Booking declined' ? <>{result}</>:
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