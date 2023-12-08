import React from 'react';

import BannerComponent from '../Banner';
import FileUpload from '../FileUpload';

export const UploadPage = () => {
    return(
    <div>
        <div className="top" >
            <BannerComponent />    
        </div>
        
        <div className="content"> 
            <FileUpload/>
        </div>

    </div>    
    )
}