import React from 'react';
import './UnauthorizedPage.css'; // Import your CSS file for styling

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>401 - Unauthorized Access</h1>
        <p>Sorry, you are not authorized to access this page.</p>
        <p>Please contact the administrator for assistance or log in with appropriate credentials.</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
