import React, { useState } from 'react';
import './LoginForm.css';
import Logo from './Logo';
import { request } from './AxiosHelper';
import { useUser } from './UserContext';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setUser, setIsLoggedIn } = useUser();

    const handleLogin = async () => {
            request(
                "POST",
                "/auth/login",
                {   email: email,
                    password: password
                }).then((response) => {
                    const user = response.data;
                    localStorage.setItem('userName', user.userName)
                    localStorage.setItem('userRole', user.userRole)

                    if (user.userRole === 'ROLE_PATIENT') {
                        setIsLoggedIn(true);
                        window.location.href = '/patient';
                    } 
                    
                    if (user.userRrole === 'ROLE_EMPLOYEE') {
                        setIsLoggedIn(true);
                        window.location.href = '/lab';
                    } 
                   
            }).catch((error) => {
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