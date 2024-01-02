import React, { useState } from 'react';
import './LoginForm.css';
import Logo from './Logo';
import { request } from './AxiosHelper';
import { useUser } from './UserContext';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { setUser, setIsLoggedIn } = useUser();

    const handleLogin = async () => {
        request("POST", "/auth/login", {
            email: email,
            password: password
        })
        .then((response) => {
            const user = response.data;
            setUser(response.data);
            sessionStorage.setItem('userName', user.userName);
            sessionStorage.setItem('userRole', user.userRole);

            if (user.userRole === 'ROLE_PATIENT') {
                setIsLoggedIn(true);
                window.location.href = '/patient';
            } else if (user.userRole === 'ROLE_EMPLOYEE') {
                setIsLoggedIn(true);
                window.location.href = '/lab';
            } else if (user.userRole === 'ROLE_ADMIN') {
                setIsLoggedIn(true);
                window.location.href = '/admin';
            }
        })
        .catch((error) => {
            setUser(null);
            setIsLoggedIn(false);
            setErrorMessage('Niepoprawne dane logowania. Spróbuj ponownie.');
        });
    };

    return (
        <div className="login-form">
            <Logo />
            <div className="instruction">
                Logowanie do profilu pacjenta
            </div>
            <input
                type="text"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="login-button" onClick={handleLogin}>
                Zaloguj
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p className="register-link">
                Nie masz konta?{' '}
                <a href="/register" className="register-text">
                    Zarejestruj się
                </a>
            </p>
        </div>
    );
}

export default LoginForm;
