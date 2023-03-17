import './HelperList.css'

import ReactCardFlip from 'react-card-flip';
import React,{ useState, useEffect } from 'react';
import { BsPersonCircle } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';

import { displayAvailHelperList } from '../Routes/Login/AuthService';

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

    const fetchData = async () => {
      try {
          console.log("Day", days[props.Day]);
          setIsLoading(true);
          await displayAvailHelperList(days[props.Day], props.Time, props.Duration).then(
            (response) => setFormData(response.data)
          );
          console.log("Response:",formData);
        } catch (error) {
          console.error('error', error);
        }
        setIsLoading(false);
    }
    fetchData();
    
    
  }, []); 


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