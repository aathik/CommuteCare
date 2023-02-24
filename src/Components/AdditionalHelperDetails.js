import React from 'react'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom';

import { additionalDetailsHelper } from '../Routes/Login/AuthService';


const AdditionalHelperDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [nationality, setNationality] = useState("");
  const [bio, setbio] = useState("");

  const navigate = new useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleBioChange = (event) => {
    setbio(event.target.value);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!firstName || !lastName || !dob || !gender || !phone || !nationality || !bio){
      alert("fill all columns");
      return false; 
    }
    const date = dob.$D+"/"+(dob.$M +1)+"/"+dob.$y;
    try {
      await additionalDetailsHelper(firstName, lastName, gender, date, phone, bio, nationality);
      navigate('/helperHome');
    } catch (error) {
      console.error('error', error);
    }
    
    
    
  };


  return (
    <div className='addHelp'>

      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Additional Details</h2>
        <div className='signup-container'>
        <div className='signup-field'>
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={handleFirstNameChange}
              pattern="[A-Za-z ]+"
              placeholder="Please enter only alphabetical characters"
              required
            />
          </div>
          <div className='signup-field'>
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={handleLastNameChange}
              pattern="[A-Za-z ]+"
              placeholder="Please enter only alphabetical characters"
              required
            />
          </div>
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
            <input type="file" id="photo" onChange={handlePhotoChange}/>
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
            <label htmlFor="nationality">Nationality:</label>
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={handleNationalityChange}
              pattern="[A-Za-z]+"
              placeholder="Enter your nationality"
              required
            />
          </div>

          <div className='signup-field'>
            <label htmlFor="bio">Enter your Bio:</label>
            <textarea
              type="text"
              id="bio"
              value={bio}
              onChange={handleBioChange}
              placeholder="Enter your bio"
              className='text-area'
              required
            />
          </div>
          
          <div className='signup-field'>
            <button type="submit" className='btn'>Proceed</button>

          </div>

          
        </div>
        </form>



    </div>
  )
}

export default AdditionalHelperDetails