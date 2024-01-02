import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExamOffers.css'; 
import PageNavigation from './PageNavigation';
import ExamReservation from './ExamReservation';
import { useUser } from './UserContext';

const ExamOffers = () => {
  const pageSize = 2;
  const [examOffers, setExamOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Initial page number
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    const fetchExamOffers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/exam/offer`, {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });

        setExamOffers(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching exam offers:', error);
      }
    };

    fetchExamOffers();
  }, [currentPage]);

 const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  
  const handleReservation = async (id) => {
    try {
      setSelectedOfferId(id);
    } catch (error) {
      console.error('Error reserving exam:', error);
    }
  };

  return (
    <div className="exam-offers-container">
      {examOffers.map((offer) => (
        <div key={offer.id} className="exam-offer-box-container">
          <div className="exam-offer-box">
            <div className='name'>
              <h3>{offer.name}</h3>
              <h5>{offer.additionalInformation}</h5>
            </div>
           
            <p>{offer.description}</p>
            <p>Wymagania: {offer.requirements}</p>
            <p>Cena: {offer.price}</p>
            {isLoggedIn && user.userRole === 'ROLE_PATIENT' && (
            <button className='reservationButton' onClick={() => handleReservation(offer.id)}>ZAREZERWUJ</button>
            )}
            {selectedOfferId === offer.id && (
              <ExamReservation 
                examOfferId={selectedOfferId}
              />
            )}
          
          </div>
        </div>
      ))}
      <PageNavigation
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
      />
    </div>
  );
  
};

export default ExamOffers;