import React, { useState } from 'react';
import './LoginForm.css';
import Logo from './Logo';
import { request, setAuthHeader } from './AxiosHelper';
import { useUser } from './UserContext';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser, setIsLoggedIn } = useUser();

    const handleLogin = async () => {
            request(
                "POST",
                "/user/login",
                {   email: email,
                    password: password
                }).then((response) => {
                    setAuthHeader(response.data.token);
                    setUser(response.data);
                    setIsLoggedIn(true)
                    window.location.href = '/user'
                }).catch((error) => {
                    setAuthHeader(null);
                    setUser(null);
                    setIsLoggedIn(false)
                }
            );
    
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
        </div>
    );
}
export default LoginForm; 
