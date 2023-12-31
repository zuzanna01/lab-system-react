import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css'; 
import { FaFile } from 'react-icons/fa'; 
import { request } from './AxiosHelper';

const FileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');

  const handleUpload = async () => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const fileContent = reader.result;
          await request('POST', '/result', { file:fileContent });
          setUploadedFile(null);
          setOrderNumber('');
        } catch (error) {
          console.error('Error while uploading:', error);
          // Handle error
        }
      };
      reader.readAsText(uploadedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const xmlFile = acceptedFiles.find(file =>  file.name.endsWith('.xml'));
        if (xmlFile) {
          setUploadedFile(xmlFile);
        } else {
          console.log('Please upload an XML file.');
        }
      }
    },
    maxFiles: 1,
    accept: 'text/xml, .xml',
  });

  const handleOrderNumberChange = (event) => {
    setOrderNumber(event.target.value);
  };

  return (
    <div className="file-upload">
      <div className="order-number-container">
        <label htmlFor="orderNumber" className="order-label">
          Numer zlecenia:
        </label>
        <input
          type="text"
          id="orderNumber"
          value={orderNumber}
          onChange={handleOrderNumberChange}
          placeholder="Enter order number"
          className="order-number-input"
        />
      </div>
      <div className="file-upload-container" {...getRootProps()}>
        <input {...getInputProps()} />
        {!uploadedFile ? (
          <div className="upload-box">
            <FaFile className="drive-icon violet-icon" />
            <p>Drag and drop an XML file here or click to browse.</p>
          </div>
        ) : (
          <div className="file-info">
            <FaFile className="drive-icon violet-icon" />
            <p>Wybrany plik: {uploadedFile.name}</p>
          </div>
        )}
      </div>
      <button type="button" className="share-button" onClick={handleUpload}>
        Udostępnij
      </button>
    </div>
  );
};

export default FileUpload;
