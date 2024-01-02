import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './LabSelection.css'

function LabSelection({selectedLab, handleLabSelection}) {
      
  const [labsList, setLabsList] = useState([]);

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

  return (
    <div className='lab-selection'>
    <select
        value={selectedLab}
        onChange={(e) => handleLabSelection(e.target.value)}
        className="lab-dropdown"
      >
        <option value="">Wybierz laboratorium</option>
        {labsList.map((lab) => (
          <option key={lab.id} value={lab.id}>
            {lab.address}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LabSelection;