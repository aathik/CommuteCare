import React, { useEffect } from "react";
import "./HelperAvailabilityPage.css";
import { useState } from "react";

import Calendar from "react-calendar";
import TimeField from "react-simple-timefield";

import { editAvailability, getAvailability } from "../Routes/Login/AuthService";
import { Button } from "@mui/material";

const HelperAvailabilityPage = () => {
  const [date, setDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [errorStartTime, setErrorStartTime] = useState(null);
  const [errorEndTime, setErrorEndTime] = useState(null);
  const errortxt = "Invalid Time";

  const [startTimeMon, setStartTimeMon] = useState("");
  const [endTimeMon, setEndTimeMon] = useState("");

  const [startTimeTue, setStartTimeTue] = useState("");
  const [endTimeTue, setEndTimeTue] = useState("");

  const [startTimeWed, setStartTimeWed] = useState("");
  const [endTimeWed, setEndTimeWed] = useState("");

  const [startTimeThu, setStartTimeThu] = useState("");
  const [endTimeThu, setEndTimeThu] = useState("");

  const [startTimeFri, setStartTimeFri] = useState("");
  const [endTimeFri, setEndTimeFri] = useState("");

  const [startTimeSat, setStartTimeSat] = useState("");
  const [endTimeSat, setEndTimeSat] = useState("");

  const [startTimeSun, setStartTimeSun] = useState("");
  const [endTimeSun, setEndTimeSun] = useState("");

  const [showAvailability, setShowAvailability] = useState({
    Monday: `${startTimeMon} ${endTimeMon}`,
    Tuesday: `${startTimeTue} ${endTimeTue}`,
    Wednesday: `${startTimeWed} ${endTimeWed}`,
    Thursday: `${startTimeThu} ${endTimeThu}`,
    Friday: `${startTimeFri} ${endTimeFri}`,
    Saturday: `${startTimeSat} ${endTimeSat}`,
    Sunday: `${startTimeSun} ${endTimeSun}`,
  });

  const [getAvailabilityInPage, setgetAvailabilityInPage] = useState("");

  const helperId = localStorage.getItem("HelperID");

  const handleSelectedDay = (option) => {
    setSelectedDay(option === selectedDay ? null : option);
  };

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

  // const handleRemoveAvailability = (event) => {
  //   event.preventDefault();
  //   if (!selectedDay) {
  //     alert("Please select the day you want to remove");
  //     return false;
  //   }
  //   setShowAvailability((showAvailability) => ({
  //     ...showAvailability,
  //     [selectedDay]: "",
  //   }));
  // };

  useEffect(() => {
    setShowAvailability({
      Monday: `${startTimeMon} ${endTimeMon}`,
      Tuesday: `${startTimeTue} ${endTimeTue}`,
      Wednesday: `${startTimeWed} ${endTimeWed}`,
      Thursday: `${startTimeThu} ${endTimeThu}`,
      Friday: `${startTimeFri} ${endTimeFri}`,
      Saturday: `${startTimeSat} ${endTimeSat}`,
      Sunday: `${startTimeSun} ${endTimeSun}`,
    });
  }, [
    startTimeMon,
    startTimeTue,
    startTimeWed,
    startTimeThu,
    startTimeFri,
    startTimeSat,
    startTimeSun,
    endTimeMon,
    endTimeTue,
    endTimeWed,
    endTimeThu,
    endTimeFri,
    endTimeSat,
    endTimeSun,
  ]);

  const handleSubmit = async (event) => {
    console.log("Availability: ", showAvailability);

    try {
      await editAvailability(showAvailability);
    } catch (error) {
      console.error("error", error);
    }
  };

  var maxDate = new Date(); //Date
  maxDate.setDate(maxDate.getDate() + 6);



   
   const fetchAvailability = async () => {
    try {
      await getAvailability(helperId).then((response) =>{
        setgetAvailabilityInPage(response.data.availability);
        setStartTimeMon(response.data.availability.Monday.slice(0,5));
        setEndTimeMon(response.data.availability.Monday.slice(6,11));
        setStartTimeTue(response.data.availability.Tuesday.slice(0,5));
        setEndTimeTue(response.data.availability.Tuesday.slice(6,11));
        setStartTimeWed(response.data.availability.Wednesday.slice(0,5));
        setEndTimeWed(response.data.availability.Wednesday.slice(6,11));
        setStartTimeThu(response.data.availability.Thursday.slice(0,5));
        setEndTimeThu(response.data.availability.Thursday.slice(6,11));
        setStartTimeFri(response.data.availability.Friday.slice(0,5));
        setEndTimeFri(response.data.availability.Friday.slice(6,11));
        setStartTimeSat(response.data.availability.Saturday.slice(0,5));
        setEndTimeSat(response.data.availability.Saturday.slice(6,11));
        setStartTimeSun(response.data.availability.Sunday.slice(0,5));
        setEndTimeSun(response.data.availability.Sunday.slice(6,11));
      }

      );
    } catch (error) {
      console.error("error", error);
    }
  };

  

  useEffect(() => {
      
    fetchAvailability();
    
  }, []);

  console.log("AfterFetch: ", getAvailabilityInPage);
  
  

  return (
    <div className="availability">
      <div className="availability-grid">
        <div className="availability-calendar">
          <Calendar
            minDate={new Date()}
            maxDate={maxDate}
            onChange={setDate}
            value={date}
            required
          />
        </div>
        <div className="availability-container">
          <div className="Week-days">
            <div className="Week-day">
              <p>Monday</p>
            </div>
            <TimeField
              value={startTimeMon}
              onChange={(e) => {
                setStartTimeMon(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>to</p>
            <TimeField
              value={endTimeMon}
              onChange={(e) => {
                setEndTimeMon(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>Tuesday</p>
            </div>
            <TimeField
              value={startTimeTue}
              onChange={(e) => {
                setStartTimeTue(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>to</p>
            <TimeField
              value={endTimeTue}
              onChange={(e) => {
                setEndTimeTue(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>Wednesday</p>
            </div>
            <TimeField
              value={startTimeWed}
              onChange={(e) => {
                setStartTimeWed(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>to</p>
            <TimeField
              value={endTimeWed}
              onChange={(e) => {
                setEndTimeWed(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>Thursday</p>
            </div>
            <TimeField
              value={startTimeThu}
              onChange={(e) => {
                setStartTimeThu(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>to</p>
            <TimeField
              value={endTimeThu}
              onChange={(e) => {
                setEndTimeThu(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>Friday</p>
            </div>
            <TimeField
              value={startTimeFri}
              onChange={(e) => {
                setStartTimeFri(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>to</p>
            <TimeField
              value={endTimeFri}
              onChange={(e) => {
                setEndTimeFri(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>Saturday</p>
            </div>
            <TimeField
              value={startTimeSat}
              onChange={(e) => {
                setStartTimeSat(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>to</p>
            <TimeField
              value={endTimeSat}
              onChange={(e) => {
                setEndTimeSat(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
          <div className="Week-days">
            <div className="Week-day">
              <p>Sunday</p>
            </div>
            <TimeField
              value={startTimeSun}
              onChange={(e) => {
                setStartTimeSun(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
            <p>to</p>
            <TimeField
              value={endTimeSun}
              onChange={(e) => {
                setEndTimeSun(e.target.value);
              }}
              input={<input className="time-input" />}
              colon=":"
            />
          </div>
        </div>
      </div>
      <div className="save-button">
        <Button
          variant="outlined"
          sx={{
            ":hover": {
              bgcolor: "#006e5f4a",
              borderColor: "#006E60",
            },
            color: "white",
            backgroundColor: "#00720B",
            borderColor: "#006E60",
            width: 200,
            marginTop: 4,
          }}
          size="large"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
      {/*
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
  );
};

export default HelperAvailabilityPage;
