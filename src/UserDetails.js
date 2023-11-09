import React from 'react';
import './UserDetails.css';
import {BiUserCircle} from 'react-icons/bi';

function UserDetails() {
    return (
        <div className="user-details">
            <div className="left-side">
            
                <p className="description">Imię i nazwisko</p>
                <p>Beata Słonko</p>
        
                <p className="description">PESEL</p>
                <p>01310501993</p>
          
            </div>
           
           <div className="right-side">
       
                <p className="description">Numer telefonu</p>
                <p>+48 882 745 588</p>
        
                <p className="description">E-mail</p>
                <p>slonko.55@gmail.com</p>
   
           </div>
           
            <BiUserCircle className='user-icon'/>
           
        </div>
    )
}

export default UserDetails;
