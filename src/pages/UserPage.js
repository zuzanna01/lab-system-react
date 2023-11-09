import React from 'react';

import BannerComponent from '../Banner';
import UserDetails from'../UserDetails'

export const UserPage = () => {
    return(
    <div>
        <div className="top" >
            <BannerComponent />    
        </div>
        
        <div className="content"> 
           <UserDetails/>
        </div>

    </div>    
    )
}