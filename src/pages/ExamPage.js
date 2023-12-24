import React from 'react';

import BannerComponent from '../Banner';
import ExamOffers from '../ExamOffers';

export const ExamPage = () => {
    return(
    <div>
        <div className="top" >
            <BannerComponent />    
        </div>
        
        <div className="content"> 
            <ExamOffers/>
        </div>

    </div>    
    )
}