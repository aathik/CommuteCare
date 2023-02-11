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
  

  const [date, setDate] = useState(null);

  const [time, setTime] = useState(null);
  //console.log("Selected Time: ", time);

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);

  const [comments, setComments] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
    };


  const handleSubmit = (event) => {
    event.preventDefault();
    if(!date || !time || !selectedOption){
      alert("fill all columns");
      return false; 
    }
    const formData = {
      Date: date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear(),
      Time: time.getHours() +':'+ time.getMinutes(),
      Duration: selectedOption,
      Description: comments,
    }
    console.log("Data: ", formData);
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
                onChange={setDate} 
                value={date} 
                required/>
              </div>
              
              <div className='time-picker'>
                <p className='label'>Booking Time</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>  
                    <Stack>  
                     
                    <DesktopTimePicker  
                      label="Train Time"  
                      value={time}  
                      onChange={  
                        setTime
                      }  
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
                <Button variant="outlined" style={selectedOption === "60 Mins" ? { backgroundColor: "lightgreen" } : {}} onClick={() => handleOptionClick("60 Mins")}>60 Mins</Button>
                <Button variant="outlined" style={selectedOption === "1+ hr" ? { backgroundColor: "lightgreen" } : {}} onClick={() => handleOptionClick("1+ hr")}>1+ HR</Button>
              </Stack>
              </div>
              <div className='text-area'>
               <p className='label'>Travel Description</p>
                <Textarea minRows={2} placeholder="Additional help required (optional).." value={comments}
  onChange={(e) => setComments(e.target.value)}  />
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