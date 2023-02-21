import React from 'react'
import './HelperAvailabilityPage.css'
import Calendar from 'react-calendar';
import { useState } from 'react';
import TextField from '@mui/material/TextField';  
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';  
import Stack from '@mui/material/Stack';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';  
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';  



const HelperAvailabilityPage = () => {
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [availabilities, setAvailabilities] = useState([]);


    
    
    const handleAddAvailability = (event) => {
        event.preventDefault();

        if (date && startTime && endTime) {
            const day = date.getDay();
            const start = startTime.getHours() +':'+ startTime.getMinutes();
            const end = endTime.getHours() +':'+ endTime.getMinutes();
            const newAvailability = {
              day,
              start,
              end,
            };
            setAvailabilities([...availabilities, newAvailability]);
            setDate(null);
            setStartTime(null);
            setEndTime(null);
            console.log("availabilities: ", availabilities )
        } else{
            alert('Fill all the columns');
            return false;
        } 
    }

    const handleSubmit = (event) => {

    };
  return (
    
    <div className='availability'>
        <div className='availability-container'>
            <div className='left'>
                <form onSubmit={handleSubmit}>
                    <div className='calendar'>
                        <p className='label'>Select the Date</p>
                        <Calendar 
                        minDate = {new Date()}
                        onChange={setDate} 
                        value={date} 
                        required/>
                    </div>
                    <div className='time-picker'>
                        <p className='label'>Start Time</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>  
                            <Stack>  
                            
                            <DesktopTimePicker  
                            label="Start Time"  
                            value={startTime}
                            ampm={false}  
                            onChange={  
                                setStartTime
                            }  
                            renderInput={(params) => <TextField {...params}
                            required   />}  
                            />  
                        
                        </Stack>  
                        </LocalizationProvider> 
                </div>

                <div className='time-picker'>
                        <p className='label'>End Time</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>  
                            <Stack>  
                            
                            <DesktopTimePicker  
                            label="End Time"  
                            value={endTime}
                            ampm={false}  
                            onChange={  
                                setEndTime
                            }  
                            renderInput={(params) => <TextField {...params}
                            required   />}  
                            />  
                        
                        </Stack>  
                        </LocalizationProvider> 
                </div>

                <div className='time-picker'>
                        <button type="submit" className='btn' onClick={handleAddAvailability}>Add Availability</button>
                </div>
                </form>                
            </div>
            <div className='right'>
                <div className="bubbles">
                    
                </div>
            </div>
        </div>

    </div>
   
  )
}

export default HelperAvailabilityPage