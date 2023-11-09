import React from 'react';
import './Logo.css';
import { FaTint } from 'react-icons/fa';

function Logo(){
    return(
        <div className="banner">
            <FaTint className="blood-drop-icon" />
            <span className="lab-text"  onClick={event =>  window.location.href='/home'}>LABORATORIUM</span>
        </div>
    )
   
}

export default Logo;