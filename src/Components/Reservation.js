import React from "react";
import "./Reservation.css";
import Calendar from "react-calendar";

import image from "../Assets/home-page.jpg";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Textarea from "@mui/joy/Textarea";

import useHistoryState from "use-history-state";
import { DatePicker } from "@mui/x-date-pickers";
import { width } from "@mui/system";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Reservation = () => {
  const [date, setDate] = useHistoryState(null, "date");

  const [time, setTime] = useHistoryState(null, "time");

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useHistoryState(
    null,
    "selectedOption"
  );

  const [comments, setComments] = useHistoryState("", "comments");

  const [location, setLocation] = useHistoryState("", "Location");

  const handleOptionClick = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleSubmit = (event) => {
    console.log("submit");

    let hr = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    let min =
      time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

    event.preventDefault();
    if (!date || !time || !selectedOption) {
      alert("fill all columns");
      return false;
    }

    const formData = {
      day: date.$W,
      time: hr + ":" + min,
      duration: selectedOption,
    };
    console.log("formData", formData);

    //const getData = axios.get(`http://localhost:5000/helper?day=${days[formData.day]}&time=${formData.time}`)
    // .then(response => { console.log(response)});
    // const DataA = run(formData);
    //console.log(DataA);

    //const jsonData = JSON.stringify(Object.assign({}, DataA))

    //console.log("JsonData: ",date);
    navigate(
      `/availableHelpers?Day=${formData.day}&&time=${formData.time}&&duration=${formData.duration}`
    ); // to navigate to the next page along with the retrieved data from DB
  };

  console.log("Date:", date);
  return (
    <form onSubmit={handleSubmit}>
      <div className="reservation">
        <div className="reservation-grid">
          <div className="reservation-container">
            <div className="reservation-date-time">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  variant="standard"
                  value={date}
                  label="Date of Birth"
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  minDate={new Date()}
                  required
                  renderInput={(params) => (
                    <TextField sx={{ width: "100%" }} {...params} />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopTimePicker
                  label="Train Time"
                  value={time}
                  ampm={false}
                  onChange={setTime}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </div>

            <div className="time-required">
              <p className="label">Duration</p>
              <Stack
                spacing={2}
                direction="row"
                required
                sx={{ height: 50, width: 500, gap: 3 }}
              >
                <Button
                  variant="outlined"
                  style={
                    selectedOption === "15"
                      ? { backgroundColor: "lightgreen" }
                      : {}
                  }
                  onClick={() => handleOptionClick("15")}
                >
                  15 Mins
                </Button>
                <Button
                  variant="outlined"
                  style={
                    selectedOption === "30"
                      ? { backgroundColor: "lightgreen" }
                      : {}
                  }
                  onClick={() => handleOptionClick("30")}
                >
                  30 Mins
                </Button>
                <Button
                  variant="outlined"
                  style={
                    selectedOption === "60"
                      ? { backgroundColor: "lightgreen" }
                      : {}
                  }
                  onClick={() => handleOptionClick("60")}
                >
                  60 Mins
                </Button>
                <Button
                  variant="outlined"
                  style={
                    selectedOption === "100"
                      ? { backgroundColor: "lightgreen" }
                      : {}
                  }
                  onClick={() => handleOptionClick("100")}
                >
                  1+ HR
                </Button>
              </Stack>
            </div>

            <div className="text-area">
              <TextField
                id="comments"
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
                placeholder="Additional information..(150 wordlimit)"
                multiline
                rows={3}
                maxRows={4}
                sx={{
                  width: 450,
                  marginTop: 5,
                }}
                inputProps={{ maxLength: 150 }}
                label="Travel Description"
              />
            </div>
            <div className="location">
              <FormControl variant="standard" sx={{ width: 300 }} error={false}>
                <InputLabel id="location">Location</InputLabel>
                <Select
                  labelId="location"
                  id="location"
                  value={location}
                  label="Location"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  required
                >
                  <MenuItem value="Verdon">Verdon</MenuItem>
                  <MenuItem value="canada">Canada</MenuItem>
                  <MenuItem value="france">France</MenuItem>
                  <MenuItem value="brazil">Brazil</MenuItem>
                </Select>
                <FormHelperText>
                  {false ? "Enter Nationality Code" : ""}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="submit">
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
                Show Helpers
              </Button>
            </div>
          </div>

          <div className="image">
            <img src={image} alt="login-img" className="actual-img" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Reservation;
