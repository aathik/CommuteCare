import './HelperList.css'
import NavBar from './NavBar'
import data from '../Assets/Helper.json'
import ReactCardFlip from 'react-card-flip';
import React,{ useState, useEffect } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import axios from 'axios';

import { useNavigate, useLocation } from 'react-router-dom';

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const HelperList = () => {

  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyForm, setEmptyForm] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();


  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (index) => {
    setIsFlipped({
      ...isFlipped,
      [index]: !isFlipped[index],
    });
    
    
  };
  const queryParam = new URLSearchParams(location.search);
  const day = queryParam.get('Day');
  const time = queryParam.get('time');
  console.log("retrieved data:" , day, time);

  const bookNow = (person) =>{
    console.log("Selected index: ", person);
    navigate('/booked', {state:{person}});
  }
  

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:5000/helper?day=${days[day]}&time=${time}`)
    .then(response => {
    //const json = JSON.parse(JSON.stringify(response.data));
    setFormData(response.data)
    console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    setIsLoading(false);
    
  }, []);

  
  
  console.log("Data::", emptyForm)
  

  return (
    <div>
        <NavBar />
        { isLoading? <span>loading values</span> : 
          
        <div className='helper-container'>
              { formData.length===0  ? <span>No helpers at the moment</span> : <>
              
                  {formData.map((person, index) => (
                
                    <div key={index} className='helper-cards'>
                      <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
                        <div className='helper-details-front' >
                            <div className='left'>
                              <BsPersonCircle size={100}/>
                            </div>
                            
                            <div className='right'>
                              <h3>{person.name.firstname+' '+person.name.lastname}</h3>
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
        }
        
       
    </div>
  )
}

export default HelperList