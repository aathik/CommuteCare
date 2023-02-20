import React from 'react'
import { useLocation } from 'react-router-dom';
import HelperList from '../Components/HelperList';
import NavBar from '../Components/NavBar';

const AvailableHelpers = () => {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const day = queryParam.get('Day');
    const time = queryParam.get('time');
    
    

  return (
     <div>
        <NavBar />
        <HelperList Day={day} Time={time} />
    </div>
  )
}

export default AvailableHelpers