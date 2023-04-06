import React from 'react'
import HelperProfilePage from '../Components/HelperProfilePage'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

/**
 * *Helper Profile Page
 * *This page displays all the details of the helper 
 * 
 */

const HelperProfile = () => {
  return (
    <div>
        <NavBar />
        <HelperProfilePage />
        <Footer />
    </div>
  )
}

export default HelperProfile