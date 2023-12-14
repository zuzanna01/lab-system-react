import React, { useState, useEffect } from 'react';
import { request} from './AxiosHelper';
import axios from 'axios';
import './ResultList.css';

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => { 
    const loadResults = async () => {
    try {
      const response = await request('GET', '/result/list');
      setResults(response.data.content);
      setPageInfo(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.status === 401) {
         window.location.href = '/unauthorized';
      } 
    }
  };
    loadResults();
  }, []); 


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

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust this to your preferred date/time format
  };

 
  return (
    <div className='results-container'>
        
          <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Result Name</th>
              <th>Upload Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.resultName}</td>
                <td>{result.uploadTime}</td>
                <td>
                  <button onClick={() => handleDownload(result.id)}>Download PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <div>
            <button onClick={() => goToPage(0)} disabled={currentPage === 0}>
              First Page
            </button>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>
          Previous Page
        </button>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageInfo.totalPages - 1}>
          Next Page
        </button>
        <button onClick={() => goToPage(pageInfo.totalPages - 1)} disabled={currentPage === pageInfo.totalPages - 1}>
          Last Page
        </button>
          </div>
        </div>
      
  );
};

export default ResultList;