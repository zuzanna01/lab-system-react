import React from 'react';
import BannerComponent from '../Banner';
import UserDetails from '../UserDetails';
import ResultList from '../ResultList';
import AppointmentList from '../AppointmentList';

export const PatientPage = () => {
    const handleZmienHaslo = () => {
               // You can add your logic to change password here
    };

    return (
        <div>
            <div className="top">
                <BannerComponent />
            </div>

            <div className="content">
                <UserDetails />
                <button onClick={handleZmienHaslo}>Zmien haslo</button>
                <AppointmentList/>
            </div>
        </div>
    );
};