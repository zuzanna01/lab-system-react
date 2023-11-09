import React from 'react';
import './ResultForm.css';
import Logo from './Logo';

function ResultForm() {
    return (
        <div className="result-form">
           <Logo/>
         
                <span  className="instrucion">
                    Wprowadź numer zlecenia oraz datę urodzenia pacjenta, 
                    <br/>
                    aby otrzymać dostęp do wyników badań.
                </span>
                      
            <input type="text" placeholder="numer zlecenia" />
            <input type="date" placeholder="2001-11-03" />
            <button type="submit" className="check-button">Sprawdź wyniki</button>
        </div>
    )
}

export default ResultForm;
