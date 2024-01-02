import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentCreator.css'
import './Standard.css'

const AppointmentCreator = () => {
  const [labsList, setLabsList] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/appointment/labs');
        setLabsList(response.data);
      } catch (error) {
        console.error('Error fetching laboratories:', error);
      }
    };
    fetchLabs();
  }, []);

  const handleLabSelection = (labId) => {
    const updatedSelectedLabs = [...selectedLabs];
    const index = updatedSelectedLabs.indexOf(labId);
    if (index > -1) {
      updatedSelectedLabs.splice(index, 1); // Unselect the lab if already selected
    } else {
      updatedSelectedLabs.push(labId); // Select the lab if not already selected
    }
    setSelectedLabs(updatedSelectedLabs);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        labs: selectedLabs,
        startDate: startDate,
        endDate: endDate,
      };
  
      const response = await axios.post(
        'http://localhost:8080/appointment/create',
        requestData,
        {
          withCredentials: true,
        }
      );
      console.log('Appointments created:', response.data);
    } catch (error) {
      console.error('Error creating appointments:', error);
    }
  };

  return (
    <div className='appointment-creator'>
      <h2>Tworzenie terminów badań</h2>
      <ul>
        {labsList.map((lab) => (
          <li key={lab.id}>
            <label>
              <input
                type='checkbox'
                checked={selectedLabs.includes(lab.id)}
                onChange={() => handleLabSelection(lab.id)}
              />
              {lab.address}
            </label>
          </li>
        ))}
      </ul>

      <div className='dates'>
        <div>
          <label>Start Date:</label>
          <input className='standard-input' type='date' value={startDate} onChange={handleStartDateChange} />
        </div>

        <div>
          <label>End Date:</label>
          <input className='standard-input'type='date' value={endDate} onChange={handleEndDateChange} />
        </div>
      </div>
            

      <button className='standard-button' onClick={handleSubmit}>Create Appointments</button>
    </div>
  );
};

export default AppointmentCreator;
