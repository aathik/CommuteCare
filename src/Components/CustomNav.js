import React from 'react'
import './LoginChoicePage.css';
import logo from "../Assets/logo.jpg";
import { FormControl, NativeSelect } from '@mui/material';
import { useState } from 'react';


const CustomNav = () => {
  const [language, setlanguage] = useState(null);

  const handleChange = (event) => {
     setlanguage(event.target.value);
     localStorage.setItem('lang', event.target.value);
    console.log(event.target.value);
  }

  return (
    <div>
        <div className='logo'>
                <img src={logo} alt='logo-img' className='logo-img'></img>
                <FormControl sx={{width: 100}}>
                    <NativeSelect
                    defaultValue={localStorage.getItem('lang')}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                    onChange={handleChange}
                    >
                    <option value="English">en-US</option>
                    <option value="French">fr-FR</option>
                    <option value="German">de-DE</option>
                    <option value="Spanish">es-ES</option>
                    </NativeSelect>
                </FormControl>
            </div>
    </div>
  )
}

export default CustomNav