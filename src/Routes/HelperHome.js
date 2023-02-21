import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Components/NavBar'

const HelperHome = () => {
  return (
    <div>HelperHome
        <NavBar />
        <Link to='/helperAvailability' className='btn' >Availability</Link>

    </div>
  )
}

export default HelperHome