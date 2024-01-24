import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExamOffers.css'; 

const LabsList = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/appointment/labs');
        setLabs(response.data);
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();
  }, []);


  return (
    <div className="exam-offers-container">
      {labs.map((lab) => (
        <div key={lab.id} className="exam-offer-box-container">
          <div className="exam-offer-box">
            <div className="name">
              <h4>LABORATORIUM <br/>{lab.address}</h4>
              <p>Godzina otwarcia: <br/> {lab.openingTime}</p>
              <p>Godzina zamknięcia: <br/>{lab.closingTime}</p>
              <p>Numer telefonu: <br/>{lab.phoneNumber}</p>
            </div>
        
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabsList;