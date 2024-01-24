import React, { useState } from 'react';
import axios from 'axios';
import RegistrationForm from './RegistrationForm.js'
import './ResultList.css';
import './Standard.css'
import customFetch from './Axios.js';

const AccountManagement = () => {
  const [pesel, setPesel] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await customFetch.get(`http://localhost:8080/api/user/${pesel}`, {
      withCredentials: true,
    });
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleInactivate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/user/inactivate/${id}`, null, {
        withCredentials: true,
      });
      await handleSearch();
    } catch (error) {
      console.error('Error inactivating account:', error);
    }
  };

  const closeModal= () => {
    setShowModal(false)
  };

  const handleRegistration = async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:8080/api/auth/register/employee', formData, {
        withCredentials: true
      });

      if (response.status === 200) {
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
        setError('Użytkownik o takim e-mailu już istnieje w systemie.'); 
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('Użytkownik o takim e-mailu już istnieje w systemie'); 
    }
};

  return (
    <div className='results-container'>
      <h2> Zarządzanie kontami</h2>
      <div className='search-section row'>
        <label> PESEL: </label>
        <input
          className='standard-input'
          id='peselInput'
          type='text'cd 
          value={pesel}
          onChange={(e) => setPesel(e.target.value)}
        />
        <button className='standard-button' onClick={handleSearch}>Szukaj</button>
        <button className='standard-button' onClick={() => setShowModal(true)}>Stwórz konto pracownika</button>
        
      </div>
      <table className='results-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię i nazwisko</th>
            <th>Rola</th>
            <th>E-mail</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.name} {account.lastname}</td>
              <td>{account.role}</td>
              <td>{account.e_mail}</td>
              {account.active === true? (
              <td>
                <button className='table-button'  onClick={() => handleInactivate(account.id)}>Dezaktywuj konto</button>
              </td>
              ) : (
               <td colSpan="2">Konto nieaktywne</td>
               )}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
            <div className='standard-modal'>
              <div >
                <span className='close' onClick={closeModal}>&times;</span>
                <RegistrationForm
                error={error}
                handleRegistration={handleRegistration}
                 />
              </div>
            </div>
        )}
    </div>
  );
};

export default AccountManagement;
