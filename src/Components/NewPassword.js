import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { passwordChange, passwordChangeHelper } from '../Routes/Login/AuthService';

import './NewPassword.css';

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [confrimPassError, setConfrimPassError] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);

  const [error, setError] = useState('');

  const userType = localStorage.getItem("UserType");

    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const tok = queryParam.get('token');
    const navigate = new useNavigate();

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

  const handlePasswordShow = (event) => {
    setPasswordShown(!passwordShown)
    
  }

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!password || !confirmPassword){
      alert("fill all columns");
      return false; 
    }
    if(password !== confirmPassword){
      alert('Make sure the passwords are identical');
      return false;
    }
    if(userType === 'Customer'){
        try {
          await passwordChange(password, tok);
          navigate('/login', {state:{data: userType}})
        } catch (error) {
          console.error('error', error);
          setError(error.response.data.message);
        }
    }
    if(userType === 'Helper'){
      try {
        await passwordChangeHelper(password, tok);
        navigate('/login', {state:{data: userType}})
      } catch (error) {
        console.error('error', error);
        setError(error.response.data.message);
      }
    }

  };
  return (
    <div className='newPassword'>
        <form onSubmit={handleSubmit} className='signup-form'>
        <div className='signup-container'>

          <div className='signup-field'>
          <label htmlFor="password">New Password</label>
          <div className='password-icons'>
            <input type={passwordShown ? "text" : "password"} value={password} onChange={handlePasswordChange} className='input-field' required />
            {
              passwordShown? (<i className='icons-pass' ><AiFillEye onClick={handlePasswordShow}/></i>) : (<i className='icons-pass' ><AiFillEyeInvisible onClick={handlePasswordShow}/></i>)
            }
            
            
          </div>
          
          </div>
          {passwordError && <p className="error">{passwordError}</p>}

          <div className='signup-field'>
          <label htmlFor="password">Confirm New Password</label>
          <div className='password-icons'>
          <input type={passwordShown ? "text" : "password"} value={confirmPassword} onChange={handleConfirmPasswordChange} className='input-field' required />
            {
              passwordShown? (<i className='icons-pass' ><AiFillEye onClick={handlePasswordShow}/></i>) : (<i className='icons-pass' ><AiFillEyeInvisible onClick={handlePasswordShow}/></i>)
            }
          </div>
          </div>
          {confrimPassError && <p className="error">{confrimPassError}</p>}
        
          
          
          
          <div className='signup-field'>
            <button type="submit" className='btn'>Submit</button>

          </div>

          {error && <div className='error'>{error}</div>}
        </div>
        </form>
    </div>
  )
}

export default NewPassword