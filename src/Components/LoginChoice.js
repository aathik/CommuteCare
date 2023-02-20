import React from 'react'
import { Link } from 'react-router-dom'
import './LoginChoice.css'

const LoginChoice = () => {
  //const [choice, setChoice] = useState("Customer");
  return (
    <div className='choice'>
        
        <div className='choice-container'>
        <h3>What would you like to do today?</h3>
                <div className='choice-buttons'>
                    <Link to="/login"
                      state={{data: true}}
                      className='btn' >To Be Helped (Customer)</Link>
                </div>
            <div className='choice-buttons'>
            <Link to="/login"
                      state={{data: false}}
                      className='btn' >To Help (Helper)</Link>
            </div>
        
        
        
      </div>
    </div>
  )
}

export default LoginChoice