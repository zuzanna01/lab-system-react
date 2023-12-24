import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultList.css';
import PageNavigation from './PageNavigation';

const ResultList = () => {
  const pageSize = 2;
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchExamOffers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/result/list`, {
          params: {
            page: currentPage,
            size: pageSize,
          }, withCredentials: true
        });
        setResults(response.data.content);
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


  const handleDownload = async (resultId) => {
    console.log(`Downloading PDF for result ID: ${resultId}`);
    try {
      const response = await axios.get(`http://localhost:8080/result/${resultId}`, {
        responseType: 'arraybuffer',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response && error.response.status === 401) {
        window.location.href = '/unauthorized';
     }
    }

  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
 
  return (
    <div className='results-container'>
      <table className='results-table'>
        <thead>
          <tr>
            <th className='table-header'>ID</th>
            <th className='table-header'>Nazwa badnia</th>
            <th className='table-header'>Czas aktualizacji</th>
            <th className='table-header'>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.resultName}</td>
              <td>{result.uploadTime}</td>
              <td>
                <button className='download-btn' onClick={() => handleDownload(result.id)}>
                  Pobierz PDF
                </button>
              </td>
            </tr>
          ))}
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

export default ResultList;