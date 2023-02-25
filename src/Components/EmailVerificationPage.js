import React from 'react'
import { useState, useEffect } from "react";
import './EmailVerificationPage.css'
import { useNavigate } from 'react-router-dom';

import { verifyOTP, resendOTP, resendOTPHelper, verifyOTPHelper } from '../Routes/Login/AuthService';

const ForgotPasswordPage = (props) => {

 
  const email = props.data;
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(true);
  const [otpError, setOtpError] = useState("");
  const [remainingTime, setRemainingTime] = useState(60);
  const [tryCount, setTryCount] = useState(0);

  const navigate = new useNavigate();
  const userType = localStorage.getItem('UserType');


  useEffect(() => {

    let timer;
    if (remainingTime > 0 && otpSent) {
      timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [remainingTime, otpSent]);

  const handleOtpChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setOtp(e.target.value);
    }
  };

  const handleSendOtp = async(event) => {
    if(userType === 'Customer'){
        try {
            await resendOTP(email);
          } catch (error) {
            console.error('error', error);
            
          }
    }
    if(userType ==='Helper'){
        try {
            await resendOTPHelper(email);
          } catch (error) {
            console.error('error', error);
            
          }
    }
    

    setOtpSent(true);
    setTryCount(0);
    setRemainingTime(60);
  };

  const handleVerify = async (event) => {
    
    console.log("Otp:", Number(otp));
    if(userType === 'Customer'){
        try {
            await verifyOTP(otp, email);
            
            navigate('/additionalDetails');
          } catch (error) {
            console.error('error', error);
            setOtpError(error.response.data.message);
            setTryCount(tryCount + 1);
            setOtp("");
          }
    }
    if(userType ==='Helper'){
        try {
            await verifyOTPHelper(otp, email);
            
            navigate('/additionalDetails');
          } catch (error) {
            console.error('error', error);
            setOtpError(error.response.data.message);
            setTryCount(tryCount + 1);
            setOtp("");
          }
    }
    

  };

  const canResendOtp = tryCount < 2;


  return (
    <div className='forgot-container'>
        <div className='forgot-comp'>
          <p>OTP has been sent to {email}</p>
          <label htmlFor="otp">OTP:</label>
          <input type="text" id="otp" value={otp} onChange={handleOtpChange} />
          <p>{remainingTime} seconds remaining.</p>
          <button onClick={handleVerify} disabled={otp.length !== 4 || remainingTime === 0}>
            Verify
          </button>
          {!canResendOtp && <p>Try again later.</p>}
          {canResendOtp && (
            <button onClick={handleSendOtp} disabled={remainingTime !== 0}>
              Resend OTP
            </button>
          )}
          {otpError && <div className='error'>{otpError}</div>}
        </div>
      
    </div>
  )
}

export default ForgotPasswordPage