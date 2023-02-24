import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './ProfilePage.css';

import { displayCustomerProfile } from '../Routes/Login/AuthService';

const CustomerProfilePage = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [gender, setgender] = useState("");
    const [mob, setmob] = useState("");
    const [dob, setdob] = useState("");
    const [id, setid] = useState("");
    const [bookings, setBookings] = useState("");
    const [isLoading, setisLoading] = useState(false);

    useEffect( () => {
        const fetchData = async () => {
            try {
                setisLoading(true);
                const res = await displayCustomerProfile();
                console.log(res);
                setfirstname(res.user.firstname);
                setlastname(res.user.lastname);
                setemail(res.user.email);
                setgender(res.user.gender);
                setdob(res.user.dob);
                setmob(res.user.mob);
                setid(res.user._id);
                setBookings(res.user.bookings);
                //setresult(res);
              } catch (error) {
                console.error('error', error);
              }
              setisLoading(false);
        }
        fetchData();
    }, [])
    
  return (
    <div className='profile'>
        {
            isLoading ? <div>Loading.....</div> : <>
                    <div className='profile-container'>
                    <h3>Name: {firstname} {lastname}</h3>
                    <h4>Email: {email}</h4>
                    <h4>Gender: {gender}</h4>
                    <h4>Phone: {mob}</h4>
                    <h4>Date of Birth: {dob}</h4>
                    <h4>id: {id}</h4>
                    <h4>Booking: {bookings}</h4>
                    </div>
            </>
        }
        
    </div>
  )
}

export default CustomerProfilePage