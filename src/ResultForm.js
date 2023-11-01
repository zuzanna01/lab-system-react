import React from 'react';
import './ResultForm.css';
import Logo from './Logo';

function ResultForm() {
    return (
        <div className="result-form">
           <Logo/>
            <div className="instrucion">
                    <p>
                     Wprowadź numer zlecenia oraz datę urodzenia pacjenta,
                    </p>
                    aby otrzymać dostęp do wyników badań.   
            </div>
            <input type="text" placeholder="numer zlecenia" />
            <input type="date" placeholder="2001-11-03" />
            <button type="submit" className="check-button">Sprawdź wyniki</button>
        </div>
    )
}

export default ResultForm;
