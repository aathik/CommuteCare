import React from 'react'
import { useState, useEffect } from "react";
import './EmailVerificationPage.css'

import { forgotPass } from '../Routes/Login/AuthService';

const ForgotPasswordPage = (props) => {

  
    
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [remainingTime, setRemainingTime] = useState(60);
  const [tryCount, setTryCount] = useState(0);

  useEffect(() => {
    let timer;
    if (remainingTime > 0 && otpSent) {
      timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [remainingTime, otpSent]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setOtp(e.target.value);
    }
  };

  const handleSendOtp = async (event) => {
    if(!email){
        alert('Enter a valid email id');
        return false;
    }
    console.log(props.data)
    try {
      await forgotPass(email, props.data);
    } catch (error) {
      console.error('error', error);
    }
    setOtpSent(true);
    setTryCount(0);
    setRemainingTime(60);
  };

  const handleVerify = () => {
    if (otp === "123456") {
      // redirect to additional information page
      console.log("Redirecting to additional information page...");
    } else {
      setTryCount(tryCount + 1);
      setOtpError("Verification failed, please try again.");
      setOtp("");
    }
  };

  const canResendOtp = tryCount < 2;


  return (
    <div className='forgot-container'>
        {!otpSent ? (
        <div className='forgot-comp'>
          <label htmlFor="email" className='forgot-label'>Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
          <button className='btn' onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div className='forgot-comp'>
          <p>OTP has been sent to {email}</p>
          <label htmlFor="otp">OTP:</label>
          <input type="text" id="otp" value={otp} onChange={handleOtpChange} />
          <p>{remainingTime} seconds remaining.</p>
          <button onClick={handleVerify} disabled={otp.length !== 4 || remainingTime === 0}>
            Verify
          </button>
          <p>{otpError}</p>
          {!canResendOtp && <p>Try again later.</p>}
          {canResendOtp && (
            <button onClick={handleSendOtp} disabled={remainingTime !== 0}>
              Resend OTP
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ForgotPasswordPage