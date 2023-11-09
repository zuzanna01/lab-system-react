import React from 'react';

import BannerComponent from '../Banner';
import LoginForm from'../LoginForm'

export const LoginPage = () => {
    return(
    <div>
        <div className="top" >
            <BannerComponent />    
        </div>
        
        <div className="content"> 
           <LoginForm/>
        </div>

    </div>    
    )
}