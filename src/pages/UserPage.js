import React from 'react';
import BannerComponent from '../Banner';
import UserDetails from '../UserDetails';
import ResultList from '../ResultList';

export const UserPage = () => {
    const handleZmienHaslo = () => {
               // You can add your logic to change password here
    };

    const handleMojeWyniki = () => {
        window.location.href = '/results';
    };

    return (
        <div>
            <div className="top">
                <BannerComponent />
            </div>

            <div className="content">
                <UserDetails />
                <button onClick={handleZmienHaslo}>Zmien haslo</button>
                <ResultList/>
            </div>
        </div>
    );
};