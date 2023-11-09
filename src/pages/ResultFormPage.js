import React from 'react';

import BannerComponent from '../Banner';
import ResultForm from'../ResultForm'

export const ResultFormPage = () => {
    return(
    <div>
        <div className="top" >
            <BannerComponent />    
        </div>
        
        <div className="content"> 
           <ResultForm/>
        </div>

    </div>    
    )
}