import React from 'react'
import { Link } from 'react-router-dom'
import './LoginChoicePage.css'
import IntroImg from "../Assets/img1.jpg";

const LoginChoicePage = () => {
  
  return (
    <div className='choice'>
        <div className="mask">
            <img className="intro-img" src={IntroImg} alt='heroImg'></img>
        </div>
        <div className='choice-container'>
         <div className='choice-contents'>
            <h3>What would you like to do today?</h3>
                    <div className='choice-buttons'>
                      <div className='buttons'>
                        <Link to="/login"
                          state={{data: "Customer"}}
                          >To Be Helped</Link>
                      </div>
                        
                    </div>
                <div className='choice-buttons'>
                <div className='buttons'>
                      <Link to="/login"
                          state={{data: "Helper"}}
                          >To Help</Link>
                  </div>
                
                </div>
            </div> 
      </div>
    </div>
  )
}

export default LoginChoicePage