import React from 'react'
import { useState } from 'react';

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [confrimPassError, setConfrimPassError] = useState('');


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

  };
  return (
    <div className='newPassword'>
        <form onSubmit={handleSubmit} className='signup-form'>
        <div className='signup-container'>

          <div className='signup-field'>
          <label htmlFor="password">New Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} className='input-field' required />
          </div>
          {passwordError && <p className="error">{passwordError}</p>}

          <div className='signup-field'>
          <label htmlFor="password">Confirm New Password</label>
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

export default NewPassword