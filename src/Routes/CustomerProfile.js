import React from 'react'
import CustomerProfilePage from '../Components/CustomerProfilePage'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

/**
 * *Customer Profile Page
 * *This page displays all the details of the customer
 * 
 */


const CustomerProfile = () => {
  return (
    <div>
        <NavBar />
        <CustomerProfilePage />
        <Footer />
    </div>
  )
}

export default CustomerProfile