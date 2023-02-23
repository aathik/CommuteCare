import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './SignUpPage.css';

import { signUp, signUpHelper } from '../Routes/Login/AuthService';



const SignUpPage = (props) => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [confrimPassError, setConfrimPassError] = useState('');
  const [emailError, setEmailError] = useState("");


  
  const navigate = new useNavigate();
  

  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    return passwordRegex.test(password);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (!validatePassword(event.target.value)) {
      setPasswordError('Please satisfy the conditions for the password: 1 upper case character, 1 numeric, 1 special character');
    } else {
      setPasswordError('');
    }
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (!validatePassword(event.target.value)) {
      setConfrimPassError('Please satisfy the conditions for the password: 1 upper case character, 1 numeric, 1 special character');
    }
    else{
      setConfrimPassError('');
    }
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!email || !password || !confirmPassword){
      alert("fill all columns");
      return false; 
    }
    if(password !== confirmPassword){
      alert('Make sure the passwords are identical');
      return false;
    }
    if(props.data==='Customer'){
      try {
        await signUp(email, password, props.data);
        navigate('/emailVerification', {state:{data: email}} );
      } catch (error) {
        console.error('error', error);
      }
    }
    if(props.data==='Helper'){
      try {
        await signUpHelper(email, password, props.data);
        navigate('/emailVerification', {state:{data: email}} );
      } catch (error) {
        console.error('error', error);
      }
    }
    
    
  };

  return (
    <div className='signUp'>
         
        
        <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Sign Up For {props.data}</h2>
        <div className='signup-container'>
        
          <div className='signup-field'>
          <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }} className='input-field' required/>
          </div>
          {emailError && <div className="error">{emailError}</div>}

          <div className='signup-field'>
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} className='input-field' required />
          </div>
          {passwordError && <p className="error">{passwordError}</p>}

          <div className='signup-field'>
          <label htmlFor="password">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className='input-field' required />
          </div>
          {confrimPassError && <p className="error">{confrimPassError}</p>}
        
          
          
          
          <div className='signup-field'>
            <button type="submit" className='btn'>Submit</button>

          </div>
        </div>
        </form>
        

    </div>
  )
}

export default SignUpPage