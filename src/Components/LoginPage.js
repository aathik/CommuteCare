import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { login, loginHelper } from '../Routes/Login/AuthService';
//import axios from 'axios';


const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState("");
  const [error, seterror] = useState("");
  //const [formData, setformData] = useState(null);
  
  const navigate = new useNavigate();

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

 // async function loginUser(email, password){}
  //console.log("data:", props.data)

  const handleLoginClick = async (e) =>  {
      e.preventDefault();
      if(props.data === 'Customer'){
        try {
          await login(email, password, props.data);
          navigate('/customerHome');
        } catch (error) {
          console.error('error', error.response);
          seterror(error.response.data.message);
        }
      }
      if(props.data === 'Helper'){
        try {
          await loginHelper(email, password, props.data);
          navigate('/helperHome');
        } catch (error) {
          console.error('error', error);
        }
      }
  }

  return (
    <div className='login'>
      
      <form className='login-form'>
      <h2>Login For {props.data}</h2>
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
          <Link to="/forgotPassword" state={{userType: props.data}} onClick={handleForgotPasswordClick} className='link'>Forgot password?</Link>
        </div>
        <div>
          <Link to="/signUp" state={{userType: props.data}} onClick={handleSignUpClick} className='link'>Sign up</Link>
        </div>
        {error && <div className='error'>{error}</div>}
        <div>
          <button type="submit" onClick={handleLoginClick} className='btn'>Login</button>
        </div>
        
      </form>

    </div>
  )
}

export default LoginPage