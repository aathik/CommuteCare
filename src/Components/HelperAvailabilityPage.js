import React from 'react'
import './HelperAvailabilityPage.css'
import { useState } from 'react';

import Calendar from 'react-calendar';
import TimeField from 'react-simple-timefield';


import { editAvailability } from '../Routes/Login/AuthService';
import { Button } from '@mui/material';


const HelperAvailabilityPage = () => {
    const [date, setDate] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    
    const [errorStartTime, setErrorStartTime] = useState(null);
    const [errorEndTime, setErrorEndTime] = useState(null);
    const errortxt = "Invalid Time";

    const [startTimeMon, setStartTimeMon] = useState("00");
    const [endTimeMon, setEndTimeMon] = useState("00");

    const [startTimeTue, setStartTimeTue] = useState("00");
    const [endTimeTue, setEndTimeTue] = useState("00");

    const [startTimeWed, setStartTimeWed] = useState("00");
    const [endTimeWed, setEndTimeWed] = useState("00");

    const [startTimeThu, setStartTimeThu] = useState("00");
    const [endTimeThu, setEndTimeThu] = useState("00");

    const [startTimeFri, setStartTimeFri] = useState("00");
    const [endTimeFri, setEndTimeFri] = useState("00");

    const [startTimeSat, setStartTimeSat] = useState("00");
    const [endTimeSat, setEndTimeSat] = useState("00");

    const [startTimeSun, setStartTimeSun] = useState("00");
    const [endTimeSun, setEndTimeSun] = useState("00");

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
    
    /*
    const handleAddAvailability = (event) => {
        event.preventDefault();
        //console.log("availabilities: ", availabilities )
        if (!selectedDay || !startTime || !endTime) {
            alert('Fill all the columns');
            return false;
        } 
        if(!startTime.getHours() || !startTime.getMinutes() || !endTime.getHours() || !endTime.getMinutes()){
            alert("Invalid Time");
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
    } */
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

    var maxDate = new Date();                                                   //Date
    maxDate.setDate(maxDate.getDate()+6);

    console.log("newAvailability: ", showAvailability)


  return (
    
    <div className='availability'>
        <div className='availability-grid'>
            <div className='availability-calendar'>
                <Calendar 
                    minDate = {new Date()}
                    maxDate = {maxDate}
                    onChange={setDate} 
                    value={date} 
                    required/>
            </div>
            <div className='availability-container'>
                <div className='Week-days'>
                    <p>Monday</p>
                        <TimeField
                                value={startTimeMon}                        
                                onChange={(e)=>{
                                    setStartTimeMon(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                        <p >to</p>
                        <TimeField
                                value={endTimeMon}                        
                                onChange={(e)=>{
                                    setEndTimeMon(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                </div>
                <div className='Week-days'>
                    <p>Tuesday</p>
                        <TimeField
                                value={startTimeTue}                        
                                onChange={(e)=>{
                                    setStartTimeTue(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                        <p >to</p>
                        <TimeField
                                value={endTimeTue}                        
                                onChange={(e)=>{
                                    setEndTimeTue(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                </div>
                <div className='Week-days'>
                    <p>Wednesday</p>
                        <TimeField
                                value={startTimeWed}                        
                                onChange={(e)=>{
                                    setStartTimeWed(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                        <p >to</p>
                        <TimeField
                                value={endTimeWed}                        
                                onChange={(e)=>{
                                    setEndTimeWed(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                </div>
                <div className='Week-days'>
                    <p>Thursday</p>
                        <TimeField
                                value={startTimeThu}                        
                                onChange={(e)=>{
                                    setStartTimeThu(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                        <p >to</p>
                        <TimeField
                                value={endTimeThu}                        
                                onChange={(e)=>{
                                    setEndTimeThu(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                </div>
                <div className='Week-days'>
                    <p>Friday</p>
                        <TimeField
                                value={startTimeFri}                        
                                onChange={(e)=>{
                                    setStartTimeFri(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                        <p >to</p>
                        <TimeField
                                value={endTimeFri}                        
                                onChange={(e)=>{
                                    setEndTimeFri(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                </div>
                <div className='Week-days'>
                    <p>Saturday</p>
                        <TimeField
                                value={startTimeSat}                        
                                onChange={(e)=>{
                                    setStartTimeSat(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                        <p >to</p>
                        <TimeField
                                value={endTimeSat}                        
                                onChange={(e)=>{
                                    setEndTimeSat(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                </div>
                <div className='Week-days'>
                    <p>Sunday</p>
                        <TimeField
                                value={startTimeSun}                        
                                onChange={(e)=>{
                                    setStartTimeSun(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                        <p >to</p>
                        <TimeField
                                value={endTimeSun}                        
                                onChange={(e)=>{
                                    setEndTimeSun(e.target.value) }}
                                input={<input className='time-input'/>}      
                                colon=":"                           
                                                      
                            />
                </div>

                
            </div>
            
        </div>
        <div className='save-button'>

                        <Button variant='outlined' sx={{
                            ":hover": {
                            bgcolor: "#006e5f4a",
                            borderColor: "#006E60",
                            },
                            color: "white",
                            backgroundColor: "#00720B",
                            borderColor: "#006E60",
                            width: 200,
                            marginTop: 4
                        }} size="large" onClick={handleSubmit}>
                            Save
                        </Button>

                </div>
        { /*
        <div className='availability-container'>
            <div className='left'>
                <form onSubmit={handleSubmit}>
                    
                    <div className='Days'>
                        <h3 >Select the Day -</h3>
                        <input type="radio" id="Monday" name="Day" value="Monday" onClick={() => handleSelectedDay("Monday")}/>
                        <label htmlFor="Monday">Monday - {JSON.stringify(showAvailability.Monday, null, 100)}</label>

                        <input type="radio" id="Tuesday" name="Day" value="Tuesday" onClick={() => handleSelectedDay("Tuesday")} />
                        <label htmlFor="Tuesday">Tuesday - {JSON.stringify(showAvailability.Tuesday, null, 100)}</label>

                        <input type="radio" id="Wednesday" name="Day" value="Wednesday" onClick={() => handleSelectedDay("Wednesday")} />
                        <label htmlFor="Wednesday">Wednesday - {JSON.stringify(showAvailability.Wednesday, null, 100)}</label>

                        <input type="radio" id="Thursday" name="Day" value="Thursday" onClick={() => handleSelectedDay("Thursday")} />
                        <label htmlFor="Thursday">Thursday - {JSON.stringify(showAvailability.Thursday, null, 100)}</label>

                        <input type="radio" id="Friday" name="Day" value="Friday"  onClick={() => handleSelectedDay("Friday")}/>
                        <label htmlFor="Friday">Friday - {JSON.stringify(showAvailability.Friday, null, 100)}</label>

                        <input type="radio" id="Saturday" name="Day" value="Saturday"  onClick={() => handleSelectedDay("Saturday")}/>
                        <label htmlFor="Saturday">Saturday - {JSON.stringify(showAvailability.Saturday, null, 100)}</label>

                        <input type="radio" id="Sunday" name="Day" value="Sunday" onClick={() => handleSelectedDay("Sunday")} />
                        <label htmlFor="Sunday">Sunday - {JSON.stringify(showAvailability.Sunday, null, 100)}</label>

                    </div>
                    <div className='time-picker-upper'>
                        <br></br><br></br>
                        <p className='paraTag'>Start Time</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>  
                            <Stack>  
                            
                            <DesktopTimePicker  
                            label=""  
                            value={startTime}
                            ampm={false}  
                            onChange={  
                                setStartTime
                            }  
                            onError={
                                setErrorStartTime
                            }
                            
                            renderInput={(params) => <TextField 
                                
                                {...params} sx={{ width:"100%" }} 
                                errorStartTime
                                helperText={errorStartTime? errortxt: ''}
                              />}
                            
                              
                            />  
                        
                        </Stack>  
                        </LocalizationProvider> 
                </div>
                <br></br>
                <div className='time-picker-upper'>
                        <p className='paraTag'>End Time</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>  
                            <Stack>  
                            
                            <DesktopTimePicker  
                            label=""  
                            value={endTime}
                            ampm={false}  
                            onChange={  
                                setEndTime
                            }  
                            onError={
                                setErrorEndTime
                            }
                            
                            renderInput={(params) => <TextField 
                                
                                {...params} sx={{ width:"100%" }} 
                                errorStartTime
                                helperText={errorEndTime? errortxt: ''}
                              />}
                            />  
                        
                        </Stack>  
                        </LocalizationProvider> 
                </div>

                <div className='time-picker-lower'>
                        <br></br><br></br>
                        <button className='btn' onClick={handleAddAvailability}>Add</button>
                        <button className='btn' onClick={handleRemoveAvailability}>Remove</button>
                        <div className='space'> </div><button type="submit" className='btn' onClick={handleSubmit}>Update</button>
                </div>
                </form>                
            </div>
            {/* <div className='right'>
                <div className="availability-list">
                    <div><pre>{JSON.stringify(showAvailability, null, 100)}</pre></div>
                    <div><pre>Monday : {JSON.stringify(showAvailability.Monday, null, 100)}</pre></div>
                </div>
            </div> 
        </div> */}
    </div>
   
  )
}

export default HelperAvailabilityPage