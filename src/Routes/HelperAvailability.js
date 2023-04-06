import React from 'react'
import NavBar from '../Components/NavBar'
import HelperAvailabilityPage from '../Components/HelperAvailabilityPage'

/**
 * *Helper Availability Page
 * *THis is the helper home page which allows the helper to change his/her availability for the week
 * 
 */

const HelperAvailability = () => {
  return (
    <div>
        <NavBar />
        <HelperAvailabilityPage />
    </div>
  )
}

export default HelperAvailability