import React, { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';
import { useUser } from './UserContext';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { setUser, setIsLoggedIn } = useUser();

    const handleChangePassword = async () => {
        try {
            if (newPassword !== confirmNewPassword) {
                setErrorMessage('Nowe hasła nie pasują do siebie.');
                return;
            }

            // Call your API to change the password using axios or fetch here
            // Example:
            // const response = await axios.post('YOUR_API_ENDPOINT', {
            //     oldPassword: oldPassword,
            //     newPassword: newPassword
            // });

            // Add your logic to handle the API response accordingly
            
            // For example, if the password change is successful:
            // Display success message or redirect the user

        } catch (error) {
            setUser(null);
            setIsLoggedIn(false);
            setErrorMessage('Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie.');
        }
    };

    return (
        <div className="login-form">
            <div className="instruction">
                Zmiana hasła
            </div>
            <input
                type="password"
                placeholder="Stare hasło"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Nowe hasło"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Potwierdź nowe hasło"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="button" className="change-password-button" onClick={handleChangePassword}>
                Zmień hasło
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default ChangePassword;
