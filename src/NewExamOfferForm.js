import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewExamOfferForm.css';
import './Standard.css'
import './AppointmentCreator.css'

const NewExamOfferForm = () => {
  const [examCodes, setExamCodes] = useState([]);
  const [newExamOffer, setNewExamOffer] = useState({
    name: '',
    examsCodes: [],
    additionalInformation: '',
    description: '',
    requirements: '',
    price: '',
  });

  useEffect(() => {
    // Fetch exam codes from the endpoint
    const fetchExamCodes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/exam');
        setExamCodes(response.data);
      } catch (error) {
        console.error('Error fetching exam codes:', error);
        // Handle error
      }
    };

    fetchExamCodes();
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExamOffer((prevExamOffer) => ({
      ...prevExamOffer,
      [name]: value,
    }));
  };

  const handleExamCodesChange = (selectedExamCodes) => {
    setNewExamOffer((prevExamOffer) => ({
      ...prevExamOffer,
      examsCodes: selectedExamCodes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with newExamOffer data
    console.log('Form submitted:', newExamOffer);
  };

  return (
    <div className='exam-creation'>
      <h2> Dodawanie nowych badań</h2>
    <form className='exam' onSubmit={handleSubmit}>
      <label>
        Nazwa badania:
        <input type="text" name="name" value={newExamOffer.name} onChange={handleInputChange} />
      </label>

      <label>
  Kody IC9:
  <select
    name="examsCodes"
    multiple
    value={newExamOffer.examsCodes}
    onChange={(e) => handleExamCodesChange(Array.from(e.target.selectedOptions, (option) => option.value))}
  >
    {examCodes.map((exam) => (
      <option key={exam.id} value={`${exam.icd9code}:${exam.name}`}>
        {`${exam.icd9code} - ${exam.name}`}
      </option>
    ))}
  </select>
</label>


      <label>
        Dodatkowe informacje
        <textarea
          name="additionalInformation"
          value={newExamOffer.additionalInformation}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Opis badania: 
        <textarea name="description" value={newExamOffer.description} onChange={handleInputChange} />
      </label>

      <label>
        Wymagania:
        <textarea name="requirements" value={newExamOffer.requirements} onChange={handleInputChange} />
      </label>

      <label>
        Price:
        <input type="text" name="price" value={newExamOffer.price} onChange={handleInputChange} />
      </label>

      <button className='standard-button' type="submit">Submit</button>
    </form>
    </div>
  );
};

export default NewExamOfferForm;
