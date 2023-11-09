import React from 'react';
import './LoginForm.css';
import Logo from './Logo';

function LoginForm() {
    return (
        <div className="login-form">
           <Logo/>
            <div className="instrucion">
                    Logowanie do 
                    profilu pacjenta  
            </div>
            <input type="text" placeholder="e-mail" />
            <input type="text" placeholder="hasło" />
            <button type="submit" className="login-button">Zaloguj</button>
        </div>
    )
}

export default LoginForm;