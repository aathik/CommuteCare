import React, { useState } from 'react';
import './Reservation.css';
import Calendar from 'react-calendar';

import TextField from '@mui/material/TextField';  
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';  
import Stack from '@mui/material/Stack';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';  
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';  
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Textarea from '@mui/joy/Textarea';


const Reservation = () => {
  

  const [value, onChange] = useState(null);

  const [tvalue, setValue] = React.useState(null);  

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!value || !tvalue || !selectedOption){
      alert("fill all columns");
      return false; 
    }
    console.log("Selected Date: ", value);
    console.log("Selected Time: ", tvalue);
    console.log("Selected date: ", selectedOption);
    navigate('/helperList');
  };

  return (   
    <form onSubmit={handleSubmit}>
      <div className='reservation'>
        <div className='reservation-container'>
              <div className='calendar'>
                <p className='label'>Select the Date</p>
                <Calendar 
                minDate = {new Date()}
                onChange={onChange} 
                value={value} 
                required/>
              </div>
              
              <div className='time-picker'>
                <p className='label'>Booking Time</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>  
                    <Stack>  
                      
                    <DesktopTimePicker  
                      label="Train Time"  
                      value={tvalue}  
                      onChange={(newValue) => {  
                        setValue(newValue);  
                      }}  
                      renderInput={(params) => <TextField {...params}
                      required   />}  
                    />  
                  
                  </Stack>  
                </LocalizationProvider> 
              </div>
              <div className='time-required'>
              <p className='label'>Travel Duration</p>
              <Stack spacing={2} direction="row" required >
                <Button variant="outlined" style={selectedOption === "15 Mins" ? { backgroundColor: "lightgreen" } : {}} onClick={() => handleOptionClick("15 Mins")}>15 Mins</Button>
                <Button variant="outlined" style={selectedOption === "30 Mins" ? { backgroundColor: "lightgreen" } : {}} onClick={() => handleOptionClick("30 Mins")}>30 Mins</Button>
                <Button variant="outlined" style={selectedOption === "1 hr" ? { backgroundColor: "lightgreen" } : {}} onClick={() => handleOptionClick("1 hr")}>1 hr</Button>
              </Stack>
              </div>
              <div className='text-area'>
               <p className='label'>Travel Description</p>
                <Textarea minRows={2} placeholder="Additional help required (optional).." />
              </div>              
              <div className='submit'>
                  <Button variant="contained" size='large' type='submit'>Show helpers</Button>
              </div>
        </div>
      </div>
    </form> 
  );
}   

export default Reservation;