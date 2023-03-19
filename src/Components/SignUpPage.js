import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import logo from "../Assets/logo.jpg";
import image from "../Assets/home-page.jpg";

import { signUp, signUpHelper } from "../Routes/Login/AuthService";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { FormControl, NativeSelect } from "@mui/material";

const SignUpPage = (props) => {
  const [email, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFlag, setConfirmPasswordFlag] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confrimPassError, setConfrimPassError] = useState("");

  const [error, seterror] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const navigate = new useNavigate();

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

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (password) => {
    // setPassword(event.target.value);
    if (!validatePassword(password)) {
      setPasswordError(
        "Your password must contain 1 upper case character, 1 number, 1 special character"
      );
      setPasswordFlag(true);
      return true;
    } else {
      setPasswordError("");
      setPasswordFlag(false);
      return false;
    }
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    //setConfirmPassword(event.target.value);
    if (!validatePassword(confirmPassword)) {
      setConfrimPassError(
        "Your password must contain 1 upper case character, 1 number, 1 special character"
      );
      setConfirmPasswordFlag(true);
      return true;
    } else {
      setConfrimPassError("");
      setConfirmPasswordFlag(false);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      validateEmail(email) ||
      handlePasswordChange(password) ||
      handleConfirmPasswordChange(confirmPassword)
    ) {
      if (email.length === 0) {
        setEmailError("Enter Email");
        setEmailFlag(true);
      }
      if (password.length === 0) {
        setPasswordError("Enter Password");
        setPasswordFlag(true);
      }
      if (confirmPassword.length === 0) {
        setConfrimPassError("Enter Password");
        setConfirmPasswordFlag(true);
      }
      if (password !== confirmPassword) {
        setConfrimPassError("Make sure the passwords are identical");
      }
      return false;
    }
    if (props.data === "Customer") {
      try {
        await signUp(email, password, props.data);
        navigate("/emailVerification", { state: { data: email } });
      } catch (error) {
        console.error("error", error);
        seterror(error.response.data.message);
      }
    }
    if (props.data === "Helper") {
      try {
        await signUpHelper(email, password, props.data);
        navigate("/emailVerification", { state: { data: email } });
      } catch (error) {
        console.error("error", error);
        seterror(error.response.data.message);
      }
    }
  };

  return (
    <div className="signUp">
      <div className="logo">
        <img src={logo} alt="logo-img" className="logo-img"></img>
        <FormControl sx={{width: 100}}>
                    <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                    >
                    <option value="English">en-US</option>
                    <option value="French">fr-FR</option>
                    <option value="German">de-DE</option>
                    <option value="Spanish">es-ES</option>
                    </NativeSelect>
                </FormControl>
      </div>
      <div className="signup-grid">
        <form onSubmit={handleSubmit} className="signup-form">
          {/*<h2>SignUp</h2> */}
          <div className="signup-container">
            <div className="signup-field">
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
              {/*
          <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }} className='input-field' required/>*/}
            </div>

            <div className="signup-field">
              <TextField
                id="signUp"
                label="Password"
                variant="standard"
                error={passwordFlag}
                helperText={passwordError}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300, marginTop: 3 }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              {/*
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} className='input-field' required />
          {passwordError && <p className="error">{passwordError}</p>} */}
            </div>

            <div className="signup-field">
              <TextField
                id="signUp"
                label="Confirm Password"
                variant="standard"
                error={confirmPasswordFlag}
                helperText={confrimPassError}
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300, marginTop: 3 }}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
            </div>
            {/*<label htmlFor="password">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className='input-field' required />
          </div>
        {confrimPassError && <p className="error">{confrimPassError}</p>} */}

            <div className="signup-field">
              <div className="signup-button">
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
                  }}
                  size="large"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
        <div className="image">
          <img src={image} alt="login-img" className="actual-img" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
