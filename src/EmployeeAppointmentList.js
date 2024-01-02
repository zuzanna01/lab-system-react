import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultList.css';
import './Standard.css'
import PageNavigation from './PageNavigation';

const EmployeeAppointmentList = (labId) => {
  const pageSize = 5;
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    if (labId.labId !== '') {
      fetchAppointments(labId.labId, currentPage, pageSize);
    }
  }, [labId, currentPage, pageSize]);

const fetchAppointments = async (labId, page, size) => {
  try {
    const queryParams = new URLSearchParams({
      labId: labId,
      page: page,
      size: size,
    });
    const response = await axios.get(`http://localhost:8080/appointment/today?${queryParams}`, {
      withCredentials: true,
    });
    setAppointmentsData(response.data.content);
    setTotalPages(response.data.totalPages);
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.response && error.response.status === 401) {
      //window.location.href = '/unauthorized';
    }
  }
}; 

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  

  const handleConfirmation = (appointmentId) => { 
    const confirm = async (id) => {
      try {
        const response = await axios.post(`http://localhost:8080/appointment/confirm`,  
        {
          appointmentId: id,
        },
        {
          withCredentials: true,
          params: {
            appointmentId: id,
          },
        }
        );
        console.log(response.d)
        fetchAppointments(labId.labId, currentPage, pageSize);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
        // window.location.href = '/unauthorized';
        }
    };
   };
     confirm(appointmentId);
 
};

  return (
    <div className='results-container'>
    {labId.labId !== '' && (
    <div>
      <table className='results-table'>
        <thead>
          <tr>
            <th className='table-header'>Pacjent</th>
            <th className='table-header'>Nazwa Badania</th>
            <th className='table-header'>Godzina</th>
            <th className='table-header'> ... </th>
            <th className='table-header'> ... </th>
          </tr>
        </thead>
        <tbody>
          {appointmentsData.length > 0 ? (
            appointmentsData.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.examName}</td>
                <td>{appointment.time}</td>
                <td>
                  <button className='standard-button' onClick={() => handleConfirmation(appointment.id)} >
                    Pobrano materiał
                  </button></td>
                <td>
                  <button className='download-btn' >
                    Anuluj
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Brak wizyt na dziś </td>
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
     )}
    </div>
   
 ) 
};

export default EmployeeAppointmentList;
