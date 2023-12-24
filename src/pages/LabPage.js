import React from 'react';
import BannerComponent from '../Banner';
import UserDetails from '../UserDetails';
import FileUpload from '../FileUpload';


export const LabPage = () => {
    const handleZmienHaslo = () => {
               // You can add your logic to change password here
    };

    return (
        <div>
            <div className="top">
                <BannerComponent />
            </div>

            <div className="content">
                <UserDetails/>
                <button onClick={handleZmienHaslo}>Zmien haslo</button>
                <FileUpload/>
            </div>
        </div>
    );
};