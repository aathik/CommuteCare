import './HelperList.css'

import ReactCardFlip from 'react-card-flip';
import React,{ useState, useEffect } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import ReactLoading from 'react-loading';

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const HelperList = (props) => {

  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const user = localStorage.getItem("User");
  
  
  
  


  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (index) => {
    setIsFlipped({
      ...isFlipped,
      [index]: !isFlipped[index],
    });
    
    
  };

  const bookNow = (person) =>{
    
    const bookdata = {
      Person: person,
      day: days[props.Day],
      time: props.Time,
      duration: props.Duration,
    }
    console.log("Data: ", bookdata);
    navigate('/confirmationPage', {state:{bookdata}});

  }
  console.log(user);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:5000/availableHelpers?day=${days[props.Day]}&time=${props.Time}&duration=${props.Duration}`, {
      headers: {
        Authorization : `Bearer ${JSON.parse(user)}` 
      }
    })
    .then(response => {
    setFormData(response.data)
    console.log(response)
    setIsLoading(false);
    })
    .catch(error => {
      console.error(error);
    });
    
    
  }, [props.Day, props.Time, props.Duration, user]); 


  return (
    <div className='helper'>
       
        {isLoading ? <div className='loading'><ReactLoading type="spin" color="#000" /></div> : (
        <div className='helper-container'>
               {formData.length===0  ? <span>No helpers at the moment</span> : <> 
              
                  {formData.map((person, index) => (
                
                    <div key={index} className='helper-cards'>
                      <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
                        <div className='helper-details-front' >
                            <div className='left'>
                              <BsPersonCircle size={100}/>
                            </div>
                            
                            <div className='right'>
                              <h3>{person.firstname+' '+person.lastname}</h3>
                              <p className='text'>People helped: {person.helped}</p>
                              <p>Gender: {person.gender}</p>
                              
                              <div className='buttons'>
                                <button className='btn' onClick={() => handleFlip(index)}>More Info</button>
                                <button className='btn' onClick={() => bookNow(person)}>Book Now</button>
                              </div>
                              
                            </div>  
                        </div>
                        <div className='helper-details-back' >
                            <p>Email: {person.email}</p>
                            <p>Mob: {person.mob}</p>
                            <p>Nationality: {person.nationality}</p>
                            <p className='italics'>"{person.description}"</p>
                            <div className='buttons'>
                                <button className='btn' onClick={() => handleFlip(index)}>Less Info</button>
                              </div>
                        </div>
                        </ReactCardFlip>
                      </div>
            ))
              }
             </>  
            
            } 
        </div>  
        )}
        
       
    </div>
  )
}

export default HelperList