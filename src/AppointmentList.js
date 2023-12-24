import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultList.css';
import PageNavigation from './PageNavigation';

const AppointmentList = () => {
  const pageSize = 2;
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchExamOffers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/appointment/future`, {
          params: {
            page: currentPage,
            size: pageSize,
          },
          withCredentials: true
        });
        setAppointmentsData(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          window.location.href = '/unauthorized';
        }
      }
    };

    fetchExamOffers();
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='results-container'>
      <table className='results-table'>
        <thead>
          <tr>
            <th className='table-header'>Nazwa badania</th>
            <th className='table-header'>Adres laboratorium</th>
            <th className='table-header'>Data</th>
            <th className='table-header'>Godzina</th>
            <th className='table-header'></th>
          </tr>
        </thead>
        <tbody>
          {appointmentsData.length > 0 ? (
            appointmentsData.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.examName}</td>
                <td>{appointment.labAddress}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>
                  <button className='download-btn' >
                    Odwołaj badanie
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Obecnie nie masz umówionych badań</td>
            </tr>
          )}
        </tbody>
      </table>
      <PageNavigation
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};

export default AppointmentList;
