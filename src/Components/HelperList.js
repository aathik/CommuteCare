import './HelperList.css'
import NavBar from './NavBar'
import data from '../Assets/Helper.json'
import ReactCardFlip from 'react-card-flip';
import React,{ useState } from 'react';
import { BsPersonCircle } from "react-icons/bs";

import { useNavigate, useLocation } from 'react-router-dom';

const HelperList = () => {

  const navigate = useNavigate();
  const location = useLocation();


  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (index) => {
    setIsFlipped({
      ...isFlipped,
      [index]: !isFlipped[index],
    });
    
    
  };

  const bookNow = (person) =>{
    console.log("Selected index: ", person);
    navigate('/booked', {state:{person}});
  }

  return (
    <div>
        <NavBar />
        <div className='helper-container'>
            {/* {location.state.map((person, index) => (  */}     {/* maping the json file to cards */}
            {data.map((person, index) => (
                
                <div key={index} className='helper-cards'>
                  <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
                    <div className='helper-details-front' >
                        <div className='left'>
                          <BsPersonCircle size={100}/>
                        </div>
                        
                        <div className='right'>
                          <h3>{person.name}</h3>
                          <p className='text'>People helped: {person.helped}</p>
                          <p>Gender: {person.gender}</p>
                          <p>Age: {person.age}</p>
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
        ))}
         
        </div>  
        
        
       
    </div>
  )
}

export default HelperList