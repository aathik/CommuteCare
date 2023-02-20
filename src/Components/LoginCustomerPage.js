import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginCustomerPage.css';
import axios from 'axios';

const LoginCustomerPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    return passwordRegex.test(password);
  }


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };
 

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (!validatePassword(event.target.value)) {
      setPasswordError('Please satisfy the conditions for the password: 1 upper case character, 1 numeric, 1 special character');
    } else {
      setPasswordError('');
    }
  }

  const handleForgotPasswordClick = (e) => {

    // Implement forgot password functionality
  }

  const handleSignUpClick = (e) =>  {

    // Implement sign up functionality
  }


  

  const handleLoginClick = async (e) =>  {
      e.preventDefault();

      axios.post('http://localhost:5000/userLogin', {
        email: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    


  }

  return (
    <div className='login'>
      
      <form className='login-form'>
      <h2>Login For Customer</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }} className='input-field' required/>
        </div>
        {emailError && <div className="error">{emailError}</div>}
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} className='input-field' required />
        </div>
        {passwordError && <p className="error">{passwordError}</p>}
        <div>
          <Link to="/forgotPass" onClick={handleForgotPasswordClick} className='link'>Forgot password?</Link>
        </div>
        <div>
          <Link to="/signUp" onClick={handleSignUpClick} className='link'>Sign up</Link>
        </div>
        <div>
          <button type="submit" onClick={handleLoginClick} className='btn'>Login</button>
        </div>
      </form>

    </div>
  )
}

export default LoginCustomerPage