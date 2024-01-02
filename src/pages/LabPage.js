import React , {useState} from 'react';
import BannerComponent from '../Banner';
import UserDetails from '../UserDetails';
import FileUpload from '../FileUpload';
import EmployeeAppointmentList from '../EmployeeAppointmentList';
import LabSelection from '../LabSelection';
import ResultOrderList from '../ResultOrderList';

import '../Standard.css'


export const LabPage = () => {
    const [selectedLab, setSelectedLab] = useState('');

    const handleZmienHaslo = () => {
               // You can add your logic to change password here
    };

    const handleLabSelection = (labId) => {
        setSelectedLab(labId);
    };

    return (
        <div>
            <div className="top">
                <BannerComponent />
            </div>

            <div className="content">
                <UserDetails/>
                <div className='row'>
                    <LabSelection
                    selectedLab={selectedLab}
                    handleLabSelection={handleLabSelection}
                    />
                    <button className='standard-button' onClick={handleZmienHaslo}>Zmien haslo</button>
                </div>
                <EmployeeAppointmentList
                    labId={selectedLab}
                />
                <ResultOrderList
                    labId={selectedLab}
                />
                <FileUpload/>
                
            </div>
        </div>
    );
};