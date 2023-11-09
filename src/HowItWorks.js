import React from 'react';
import {FaAngleRight } from 'react-icons/fa';
import './HowItWorks.css'

function HowItWorks() {
  return (
    <div className = "how-it-wors-banner">
        <div className= "header">
            <hi>Jak to działa ?</hi>
        </div>
        <div className = "list-steps">    
            <p>Umów się <br/> na badanie</p>
            <FaAngleRight className="icon"/>
            <p>Wykonaj badanie<br/> w wybranym <br/>laboratorium</p>
            <FaAngleRight className="icon" />
            <p>Odbierz wyniki <br/> online</p>
            
        </div>
    </div>
  );
};

export default HowItWorks;
