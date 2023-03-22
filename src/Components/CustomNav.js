import React from 'react'
import './LoginChoicePage.css';
import logo from "../Assets/logo.jpg";
import { FormControl, NativeSelect } from '@mui/material';


const CustomNav = () => {
  return (
    <div>
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
    </div>
  )
}

export default CustomNav