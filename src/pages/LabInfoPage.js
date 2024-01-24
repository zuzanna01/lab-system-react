import React , {useState} from 'react';
import BannerComponent from '../Banner';
import '../Standard.css';
import LabsList from '../labsList';


export const LabInfoPage = () => {
    return (
        <div>
            <div className="top">
                <BannerComponent />
            </div>

            <div className="content">
                <LabsList/>
            </div>

        </div>
    );
};