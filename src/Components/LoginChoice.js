import React from 'react'
import { Link } from 'react-router-dom'
import './LoginChoice.css'

const LoginChoice = () => {
  
  return (
    <div className='choice'>
        
        <div className='choice-container'>
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
  )
}

export default LoginChoice