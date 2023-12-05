import React, { useState } from 'react';
import './ResultForm.css';
import Logo from './Logo';
import axios from 'axios';


function ResultForm() {
    const [orderNumber, setOrderNumber] = useState('');
    const [pdfData, setPdfData] = useState(false); 

    const getPdf = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/result/${orderNumber}`, {
          responseType: 'arraybuffer',
        });
  
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    return (
        <div className="result-form">
            <Logo />
            <input
                type="text"
                placeholder="numer zlecenia"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
            />
            
            <input type="date" placeholder="2001-11-03" />
            <button type="button" className="check-button" onClick={getPdf}>
                Sprawdź wyniki
            </button>
      
            {pdfData && <iframe title="PDF Viewer" src={pdfData} width="100%" height="500px" />}

        </div>
    );

};

export default ResultForm;
