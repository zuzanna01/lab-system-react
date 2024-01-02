import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultList.css';
import './Standard.css'
import PageNavigation from './PageNavigation';

const ResultOrderList = (labId) => {
  const pageSize = 5;
  const [resultOrdersData, setResultsOrdersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    if (labId.labId !== '') {
      fetchResultOrders(labId.labId, currentPage, pageSize);
    }
  }, [labId, currentPage, pageSize]);

const fetchResultOrders = async (labId, page, size) => {
  try {
    const queryParams = new URLSearchParams({
      labId: labId,
      page: page,
      size: size,
    });
    const response = await axios.get(`http://localhost:8080/result/orders?${queryParams}`, {
      withCredentials: true,
    });
    setResultsOrdersData(response.data.content);
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

  

  const handleUpload = (appointmentId) => { 
    /*const confirm = async (id) => {
      try {
        const response = await axios.post(`http://localhost:8080/result`,  
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
     confirm(appointmentId);*/
 
};

  return (
    <div className='results-container'>
    {labId.labId !== '' && (
    <div>
      <table className='results-table'>
        <thead>
          <tr>
            <th className='table-header'>Numer zlecenia</th>
            <th className='table-header'>Pacjent</th>
            <th className='table-header'>Nazwa Badania</th>
            <th className='table-header'> ... </th>
          </tr>
        </thead>
        <tbody>
          {resultOrdersData.length > 0 ? (
            resultOrdersData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.patientName}</td>
                <td>{order.examName}</td>
                <td>
                  <button className='standard-button' onClick={() => handleUpload(order.id)} >
                    Wgraj wynik
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Brak oczekujących badań na wyniki</td>
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

export default ResultOrderList;