import React from 'react';

import BannerComponent from '../Banner';
import Welcome from'../Welcome'
import HowItWorks from '../HowItWorks';
import Statistics from '../Statistics';

export const HomePage = () => {
    return(
    <div>
        <div className="top" >
            <BannerComponent />    
        </div>
        
        <div className="content"> 
            <Welcome />
            <Statistics/>
            <HowItWorks/>
        </div>

    </div>    
    )
}