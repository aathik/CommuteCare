import React from 'react'
import AdditionalCustomerDetails from '../Components/AdditionalCustomerDetails'
import AdditionalHelperDetails from '../Components/AdditionalHelperDetails'

const AdditionalDetails = () => {
  const userType = localStorage.getItem('UserType');
  console.log("type:", userType)
  return (
    <div>
        {userType === 'Customer' ? <AdditionalCustomerDetails /> : <AdditionalHelperDetails />
        }
    </div>
  )
}

export default AdditionalDetails