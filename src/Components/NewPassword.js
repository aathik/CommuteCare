import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { passwordChange, passwordChangeHelper } from '../Routes/Login/AuthService';
import './newPassword.css';
import logo from "../Assets/logo.jpg";
import { Button, FormControl, IconButton, InputAdornment, NativeSelect, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import './Password-icons.css';

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFlag, setConfirmPasswordFlag] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confrimPassError, setConfrimPassError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const userType = localStorage.getItem("UserType");

    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const tok = queryParam.get('token');
    const navigate = new useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    return passwordRegex.test(password);
  }

  const handlePasswordChange = (password) => {
    // setPassword(event.target.value);
     if (!validatePassword(password)) {
       setPasswordError('Your password must contain 1 upper case character, 1 number, 1 special character');
       setPasswordFlag(true);
       return true;
     } else {
       setPasswordError('');
       setPasswordFlag(false);
       return false;
     }
   }

   const handleConfirmPasswordChange = (confirmPassword) => {
    //setConfirmPassword(event.target.value);
    if (!validatePassword(confirmPassword)) {
      setConfrimPassError('Your password must contain 1 upper case character, 1 number, 1 special character');
      setConfirmPasswordFlag(true);
      return true;
    }
    else{
      setConfrimPassError('');
      setConfirmPasswordFlag(false);
      return false;
    }
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handlePasswordChange(password) || handleConfirmPasswordChange(confirmPassword)){
      
      if(password.length===0){
        setPasswordError('Enter Password');
        setPasswordFlag(true);
      }
      if(confirmPassword.length === 0){
        setConfrimPassError('Enter Password');
        setConfirmPasswordFlag(true);
      }
      if(password !== confirmPassword){
        setConfrimPassError("Make sure the passwords are identical");
      }
      return false;
    }
    if(userType === 'Customer'){
        try {
          await passwordChange(password, tok);
          navigate('/login', {state:{data: userType}})
        } catch (error) {
          console.error('error', error);
        }
    }
    if(userType === 'Helper'){
      try {
        await passwordChangeHelper(password, tok);
      } catch (error) {
        console.error('error', error);
      }
    }

  };
  return (
    <div className='new-password-page'>
      <div className='logo'>
          <img src={logo} alt='logo-img' className='logo-img'></img>
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
    <div className='newPassword'>
        <form onSubmit={handleSubmit} className='signup-form'>
        <div className='newPassword-container'>
           <label className='forgot-label'>Let’s get your account back. Enter the new password</label>
           <TextField id="signUp" 
              label="Password" 
              variant="standard"
              error = {passwordFlag}
              helperText={passwordError}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
              }}
              sx={{width: 300,
                marginTop: 3
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                }}
              required/>
          
          

          <TextField id="signUp" 
              label="Confirm Password" 
              variant="standard"
              error = {confirmPasswordFlag}
              helperText={confrimPassError}
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
              }}
              sx={{width: 300,
                marginTop: 3
              }}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                }}
              required/>
          
          <div className='newPassword-button'>
              <Button variant='outlined' sx={{
                            ":hover": {
                            bgcolor: "#006e5f4a",
                            borderColor: "#006E60",
                            },
                            color: "white",
                            backgroundColor: "#00720B",
                            borderColor: "#006E60",
                          }} size="large" onClick={handleSubmit}>
                            Submit
                        </Button>

          </div>
        </div>
        </form>
    </div>
    </div>
    
  )
}

export default NewPassword


/* Division */


// import React from 'react'
// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { passwordChange, passwordChangeHelper } from '../Routes/Login/AuthService';



// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// const NewPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState('');
//   const [confrimPassError, setConfrimPassError] = useState('');

//   const [passwordShown, setPasswordShown] = useState(false);

//   const userType = localStorage.getItem("UserType");

//     const location = useLocation();
//     const queryParam = new URLSearchParams(location.search);
//     const tok = queryParam.get('token');
//     const navigate = new useNavigate();

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
//     return passwordRegex.test(password);
//   }

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//     if (!validatePassword(event.target.value)) {
//       setPasswordError('Please satisfy the conditions for the password: 1 upper case character, 1 numeric, 1 special character');
//     } else {
//       setPasswordError('');
//     }
//   }

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//     if (!validatePassword(event.target.value)) {
//       setConfrimPassError('Please satisfy the conditions for the password: 1 upper case character, 1 numeric, 1 special character');
//     }
//     else{
//       setConfrimPassError('');
//     }
//   };

//   const handlePasswordShow = (event) => {
//     setPasswordShown(!passwordShown)
    
//   }

 

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if(!password || !confirmPassword){
//       alert("fill all columns");
//       return false; 
//     }
//     if(password !== confirmPassword){
//       alert('Make sure the passwords are identical');
//       return false;
//     }
//     if(userType === 'Customer'){
//         try {
//           await passwordChange(password, tok);
//           navigate('/login', {state:{data: userType}})
//         } catch (error) {
//           console.error('error', error);
//         }
//     }
//     if(userType === 'Helper'){
//       try {
//         await passwordChangeHelper(password, tok);
//       } catch (error) {
//         console.error('error', error);
//       }
//     }

//   };
//   return (
//     <div>
//     <NavBar />
//     <div className='newPassword'>
//         <form onSubmit={handleSubmit} className='signup-form'>
//         <div className='signup-container'>

//           <div className='signup-field'>
//           <label htmlFor="password">New Password</label>
//           <div className='password-icons'>
//             <input type={passwordShown ? "text" : "password"} value={password} onChange={handlePasswordChange} className='input-field' required />
//             {
//               passwordShown? (<i className='icons-pass' ><AiFillEye onClick={handlePasswordShow}/></i>) : (<i className='icons-pass' ><AiFillEyeInvisible onClick={handlePasswordShow}/></i>)
//             }
            
            
//           </div>
          
//           </div>
//           {passwordError && <p className="error">{passwordError}</p>}

//           <div className='signup-field'>
//           <label htmlFor="password">Confirm New Password</label>
//           <div className='password-icons'>
//           <input type={passwordShown ? "text" : "password"} value={confirmPassword} onChange={handleConfirmPasswordChange} className='input-field' required />
//             {
//               passwordShown? (<i className='icons-pass' ><AiFillEye onClick={handlePasswordShow}/></i>) : (<i className='icons-pass' ><AiFillEyeInvisible onClick={handlePasswordShow}/></i>)
//             }
//           </div>
//           </div>
//           {confrimPassError && <p className="error">{confrimPassError}</p>}
        
          
          
          
//           <div className='signup-field'>
//             <button type="submit" className='btn'>Submit</button>

//           </div>
//         </div>
//         </form>
//     </div>
//     </div>
    
//   )
// }

// export default NewPassword