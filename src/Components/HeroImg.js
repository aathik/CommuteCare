import React from 'react';
import './HeroImg.css';


import IntroImg from "../Assets/intro-img.jpg";
import {Link} from "react-router-dom";

const HeroImg = () => {
  return (
    <div className="hero">
    
        <div className="mask">
            <img className="intro-img" src={IntroImg} alt='heroImg'></img>
        </div>
        <div className="content">
            <p>Empowering independence, enhancing travel experience. </p>
            <p>Your assistive companion on the train.</p>
            <h1>Commute Care</h1>
            <div>
                <Link to="/customer" className="btn">Launch</Link>
            </div>
        </div>
    </div>
  )
}

export default HeroImg