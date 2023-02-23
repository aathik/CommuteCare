import React from 'react'
import './HelperAvailabilityPage.css'
import { useState } from 'react';
import TextField from '@mui/material/TextField';  
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';  
import Stack from '@mui/material/Stack';  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';  
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';  

import { editAvailability } from '../Routes/Login/AuthService';

const HelperAvailabilityPage = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showAvailability, setShowAvailability] = useState({
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: ""

    });

    const handleSelectedDay = (option) => {
        setSelectedDay(option === selectedDay ? null : option);
    }
    
    
    const handleAddAvailability = (event) => {
        event.preventDefault();
        //console.log("availabilities: ", availabilities )
        if (!selectedDay || !startTime || !endTime) {
            alert('Fill all the columns');
            return false;

        } 
        const day = selectedDay;
        const start = startTime.getHours() +':'+ startTime.getMinutes();
        const end = endTime.getHours() +':'+ endTime.getMinutes();
        const newAvailability = {
            day,
            start,
            end,
        };
       // console.log("newAvailability: ", newAvailability.start)
       // setAvailabilities([...availabilities, newAvailability]);
        setShowAvailability( showAvailability => ({
            ...showAvailability,
            [newAvailability.day] : newAvailability.start+ ' ' + newAvailability.end
        })
        );
        //console.log("newAvailability: ", showAvailability)
        setSelectedDay(null);
        setStartTime(null);
        setEndTime(null);
    }
    //console.log("Outside availabilities: ", availabilities )

    const handleRemoveAvailability  = (event) => {
        event.preventDefault();
        if(!selectedDay){
            alert('Please select the day you want to remove');
            return false;
        }
        setShowAvailability( showAvailability => ({
            ...showAvailability,
            [selectedDay] : ""
        })
        );

    }

    const handleSubmit = async (event) => {
        console.log("Availability: ", showAvailability)
        try {
            await editAvailability(showAvailability);
          } catch (error) {
            console.error('error', error);
          }
    };
    console.log("newAvailability: ", showAvailability)
  return (
    
    <div className='availability'>
        <div className='availability-container'>
            <div className='left'>
                <form onSubmit={handleSubmit}>
                    <div className='Days'>
                        <p className='label'>Select the Day</p>
                        <input type="radio" id="Monday" name="Day" value="Monday" onClick={() => handleSelectedDay("Monday")}/>
                        <label htmlFor="Monday">Monday</label>

                        <input type="radio" id="Tuesday" name="Day" value="Tuesday" onClick={() => handleSelectedDay("Tuesday")} />
                        <label htmlFor="Tuesday">Tuesday</label>

                        <input type="radio" id="Wednesday" name="Day" value="Wednesday" onClick={() => handleSelectedDay("Wednesday")} />
                        <label htmlFor="Wednesday">Wednesday</label>

                        <input type="radio" id="Thursday" name="Day" value="Thursday" onClick={() => handleSelectedDay("Thursday")} />
                        <label htmlFor="Thursday">Thursday</label>

                        <input type="radio" id="Friday" name="Day" value="Friday"  onClick={() => handleSelectedDay("Friday")}/>
                        <label htmlFor="Friday">Friday</label>

                        <input type="radio" id="Saturday" name="Day" value="Saturday"  onClick={() => handleSelectedDay("Saturday")}/>
                        <label htmlFor="Saturday">Saturday</label>

                        <input type="radio" id="Sunday" name="Day" value="Sunday" onClick={() => handleSelectedDay("Sunday")} />
                        <label htmlFor="Sunday">Sunday</label>

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
                        <button className='btn' onClick={handleAddAvailability}>Add Availability</button>
                        <button className='btn' onClick={handleRemoveAvailability}>Remove Availability</button>
                        <button type="submit" className='btn' onClick={handleSubmit}>Submit</button>
                </div>
                </form>                
            </div>
            <div className='right'>
                <div className="availability-list">
                    <div><pre>{JSON.stringify(showAvailability, null, 100)}</pre></div>
                </div>
            </div>
        </div>

    </div>
   
  )
}

export default HelperAvailabilityPage