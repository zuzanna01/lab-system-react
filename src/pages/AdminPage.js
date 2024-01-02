import React from 'react';
import BannerComponent from '../Banner';
import UserDetails from '../UserDetails';
import AppointmentCreator from '../AppointmentCreator';


export const AdminPage = () => {

    return (
        <div>
            <div className="top">
                <BannerComponent/>
            </div>

            <div className="content">
                <UserDetails/>
                <AppointmentCreator/>
                
            </div>
        </div>
    );
};