import React, { useState } from 'react';
import axios from 'axios';
import AppointmentTable from './AppointmentTable';
import './ExamReservation.css'
import LabSelection from './LabSelection';

const ExamReservation = ({examOfferId}) => {

  const [availableAppointments, setAvailableAppointments] = useState(new Map());

  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState('');

  const fetchAvailableSlots = async (labPointId) => {
    try {
        const currentDate = new Date();
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 7);
        
        const startDate = currentDate.toISOString(); 
        const endDate = nextDate.toISOString();
        
        const response = await axios.get('http://localhost:8080/appointment/available', {
            params: {
                startDate,
                endDate,
                labPointId,
            },
        });

        setAvailableAppointments(new Map(Object.entries(response.data)));
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleConfirmation = async (offerId, selectedLab, selectedTerm) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/appointment/make?examOfferId=${offerId}&dateTime=${selectedTerm}&labPointId=${selectedLab}`,
        null,{withCredentials: true,  }
      );

      setSelectedLab('');
      setSelectedTerm('');
      console.log(response.data)
    
    } catch (error) {
      console.error('Error fetching exam offers:', error);
    }

  };

  const handleLabSelection = (labId) => {
    setSelectedLab(labId);
    setSelectedTerm('');
    setAvailableAppointments(new Map());
    fetchAvailableSlots(labId);
  };

  const handleTermSelection = (selectedDate, selectedTime) => {
    const date = new Date(selectedDate); 
    const [hour, minute] = selectedTime.split(':'); 
    date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0); 
    const isoDateTime = date.toISOString(); 
    setSelectedTerm(isoDateTime);
  }

  return (
    <div className="exam-reservation-container">
      <h3>Wybierz laboratorium</h3>
      <LabSelection
        selectedLab={selectedLab}
        handleLabSelection={handleLabSelection}
      />
     
     {selectedLab && (
      <div>
        <h3>Wybierz termin</h3>
        <AppointmentTable 
          appointments={availableAppointments} 
          handleTermSelection={handleTermSelection}
        />
        <button onClick={() => handleConfirmation(examOfferId, selectedLab, selectedTerm)} className="confirmation-button">
          POTWIERDZAM
        </button>
      </div>
     )}
    </div>
  );
};

export default ExamReservation;