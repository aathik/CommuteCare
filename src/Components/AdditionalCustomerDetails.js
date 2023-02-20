import React from 'react'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

const AdditionalCustomerDetails = () => {
    const [dob, setDob] = useState(null);

  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.size > 20000000) {
      alert("File size should be less than 20MB");
      return;
    }
    setPhoto(selectedFile);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!firstName || !lastName || !dob || !gender || !phone || !photo || !countryCode){
      alert("fill all columns");
      return false; 
    }
    console.log({
      firstName,
      lastName,
      gender,
      photo,
      phone,
      countryCode,
    });
    
  };


  return (
    <div>

<form onSubmit={handleSubmit} className='signup-form'>
        <h2>Sign Up</h2>
        <div className='signup-container'>
        
          
          
          <div className='signup-field'>
          <label htmlFor="date-of-birth">Date of Birth:</label>
          <div className='signup-date'> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="DOB"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                  maxDate={new Date()}
                  required
                  renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
          </div>
              
          </div>
          
          
          <div className='signup-field'>
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={gender} onChange={handleGenderChange} required>
              <option value="">--Select--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>

          </div>
          
          <div className='signup-field'>
            <label htmlFor="photo">Profile Photo:</label>
            <input type="file" id="photo" onChange={handlePhotoChange} required/>
          </div>
          

          <div className='signup-field'>
            <label htmlFor="phone">Phone Number:</label>
            <div className="phone-input">
              <select
                id="country-code"
                value={countryCode}
                onChange={handleCountryCodeChange}
                required
                className='phone-country'
              >
                <option value="">--Select Country Code--</option>
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+33">+33 (FR)</option>
              </select>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                pattern="[0-9]{10}"
                placeholder='Enter 10 digit number'
                required
              />
            </div>
          </div>
          
          <div className='signup-field'>
            <button type="submit" className='btn'>Submit</button>

          </div>
        </div>
        </form>



    </div>
  )
}

export default AdditionalCustomerDetails