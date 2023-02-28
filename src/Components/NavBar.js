import React, {useState} from 'react';
import './NavBar.css';

import { Link } from "react-router-dom";

import {FaBars, FaTimes} from "react-icons/fa";

import { logout } from '../Routes/Login/AuthService';

const NavBar = () => {

  const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const [color, setColor] = useState(false);
    const changeColor = () => {
        if(window.scrollY>= 100){
            setColor(true);
        }else{
            setColor(false);
        }
    };

    const userLoggedIn = localStorage.getItem("LoggedIn");
    const userType = localStorage.getItem("UserType");

    console.log('loggedIn:', userLoggedIn)

    window.addEventListener("scroll", changeColor);

  return (
    <div className={ color ? "header header-bg" : "header"}>
            <Link to={userLoggedIn==='true' ? ('/home') : ('/')}>
            <h1>CommuteCare</h1>
            </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>
                <Link to="/home">Home</Link> 
            </li>
            {
                userType === 'Customer' && userLoggedIn && <li><Link to="/customerProfile">Profile</Link> </li> 
            }
            {
                userType === 'Helper' && userLoggedIn && <li><Link to="/helperProfile">Profile</Link> </li> 
            }
            {userLoggedIn && <li>
                
                <Link to="/" onClick={logout}>Logout</Link>

            </li> 
            }
            
            
        </ul>
        <div className="hamburger" onClick={handleClick}>
            {
                click ? (<FaTimes size={20} style={{ color: "#fff" }}/>) : (<FaBars size={20} style={{ color: "#fff" }}/>)
            }
            
        </div>
    </div>
  )
}

export default NavBar