import React, { useState } from 'react';
import './SignUpPage.css';



const SignUpPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

 

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!firstName || !lastName || !email || !password || !confirmPassword){
      alert("fill all columns");
      return false; 
    }
    console.log({
      firstName,
      lastName,
    });
    
  };

  return (
    <div className='signUp'>
         
        
        <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Sign Up</h2>
        <div className='signup-container'>
        <div className='signup-field'>
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={handleFirstNameChange}
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
              required
            />
          </div>
          
          
          
          
          <div className='signup-field'>
            <button type="submit" className='btn'>Submit</button>

          </div>
        </div>
        </form>
        

    </div>
  )
}

export default SignUpPage