import React, { useState }  from 'react';
import './Welcome.css'; 
import labPhoto from './resources/welcome1.jpg';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Dropdown } from 'primereact/dropdown';

function Welcome() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  return (
    <div className="welcome-banner">
      <div className="left-side">
        <div className="text">
          <h1>Nowoczesne laboratorium <br/> na twoich warunkach</h1>
        </div>
        <div className="city-input-container">
          <FaMapMarkerAlt className="pin-icon"/>
          <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
    editable placeholder="Wybierz miasto" className="w-full md:w-14rem" />
        </div>
      </div>
      <img src={labPhoto} alt="Laboratorium" />
    </div>
  );
};

export default Welcome;
