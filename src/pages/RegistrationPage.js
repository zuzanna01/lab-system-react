import React ,{useState} from 'react';
import BannerComponent from '../Banner';
import axios from 'axios';
import '../Standard.css'
import RegistrationForm from '../RegistrationForm';

export const RegistrationPage = () => {

    const [error, setError] = useState('');

    const handleRegistration = async (formData) => {
        try {
          console.log(formData);
          const response = await axios.post('http://localhost:8080/api/auth/register/patient', formData);
      
          if (response.status === 200) {
            console.log('Registration successful');
            window.location.href = '/login';
          } else {
            console.error('Registration failed');
            setError('Użytkownik o takim e-mailu już istnieje w systemie'); 
          }
        } catch (error) {
          console.error('Error occurred:', error);
          setError('Użytkownik o takim e-mailu już istnieje w systemie'); 
        }
    };

    return (
        <div>
            <div className="top">
                <BannerComponent />
            </div>
            <div className="content">
              <RegistrationForm
                error={error} 
                handleRegistration={handleRegistration}
              />
            </div>
        </div>
    );
};