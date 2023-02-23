import React from 'react'
import NavBar from '../Components/NavBar'
import HeroImg from '../Components/HeroImg'
import LoginChoice from '../Components/LoginChoice';

const CustomerHome = () => {
  const userLoggedIn = localStorage.getItem('LoggedIn');
  return (
    <div>
      {!userLoggedIn ? <LoginChoice /> :<>
      <NavBar />
      <HeroImg />
      </>}
    </div>
  )
}

export default CustomerHome