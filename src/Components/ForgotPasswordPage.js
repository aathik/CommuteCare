import React from "react";
import { useState, useEffect } from "react";
import "./ForgotPasswordPage.css";
import logo from "../Assets/logo.png";

import { forgotPass, forgotPassHelper } from "../Routes/Login/AuthService";
import { Button, TextField } from "@mui/material";

const ForgotPasswordPage = (props) => {
  const [email, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [remainingTime, setRemainingTime] = useState(60);
  const [tryCount, setTryCount] = useState(0);

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
      setEmailFlag(true);
      return true;
    } else {
      setEmailError("");
      setEmailFlag(false);
      return false;
    }
  };

  const handleSendOtp = async (event) => {
    if (validateEmail(email)) {
      if (email.length === 0) {
        setEmailError("Enter Email");
        setEmailFlag(true);
      }
      return false;
    }
    if (props.data === "Customer") {
      console.log(props.data);
      try {
        await forgotPass(email, props.data);
      } catch (error) {
        console.error("error", error);
      }
    }
    if (props.data === "Helper") {
      try {
        await forgotPassHelper(email, props.data);
      } catch (error) {
        console.error("error", error);
      }
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
    <div className="forgot">
      <div className="logo">
        <img src={logo} alt="logo-img" className="logo-img"></img>
      </div>
      <div className="forgot-container">
        {!otpSent ? (
          <div className="forgot-component">
            <label htmlFor="email" className="forgot-label">
              Forgot Your Password? No Problem.{" "}
            </label>
            <label className="forgot-label">
              Let Us Help You Regain Access
            </label>
            <br></br>
            <TextField
              id="signUp"
              label="Email"
              variant="standard"
              error={emailFlag}
              helperText={emailError}
              type={"email"}
              sx={{ width: 300, marginTop: 3 }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            <br></br>
            <Button
              variant="outlined"
              sx={{
                ":hover": {
                  bgcolor: "#006e5f4a",
                  borderColor: "#006E60",
                },
                color: "white",
                backgroundColor: "#00720B",
                borderColor: "#006E60",
                marginTop: 4,
              }}
              size="large"
              onClick={handleSendOtp}
            >
              Submit
            </Button>
          </div>
        ) : (
          <div className="forgot-component">
            <p className="forgot-label">
              Password reset link has been sent to {email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
