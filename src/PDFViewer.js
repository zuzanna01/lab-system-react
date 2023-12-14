import React from 'react';

const PDFViewer = ({ pdfData }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <embed src={pdfData} type="application/pdf" width="100%" height="100%" />
    </div>
  );
};

export default PDFViewer;