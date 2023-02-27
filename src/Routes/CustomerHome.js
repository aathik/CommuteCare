import React from 'react'
import NavBar from '../Components/NavBar'
import HeroImg from '../Components/HeroImg'
import LoginChoice from '../Components/LoginChoice';
import { Link } from 'react-router-dom'

const CustomerHome = () => {
  const userLoggedIn = localStorage.getItem('LoggedIn');
  return (
    // <div>
    //   {!userLoggedIn ? <LoginChoice /> :<>
    //   <NavBar />
    //   <HeroImg />
    //   </>}
    // </div>
    <div className='choice'>
        
        <div className='choice-container'>
          <h3>The journey of .....</h3>
                <div className='choice-buttons'>
                  <div className='buttons'>
                    <Link to="/login"
                      state={{data: "Customer"}}
                       >Get Started</Link>
                  </div>
                </div>
      </div>
    </div>
  )
}

export default CustomerHome