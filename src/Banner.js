
import React from 'react';
import './Banner.css';
import Logo from './Logo';

function BannerComponent() {

  
  return (
    <nav className="nav-bar">
    <ul className="nav-list">
      <Logo/>
      <li className="nav-item">katalog badań</li>
      <li className="nav-item" onClick={event =>  window.location.href='/result'}>odbierz wyniki</li>
      <li className="nav-item">poradnik</li>
      <li className="nav-item" onClick={event =>  window.location.href='/login'}>Zaloguj się</li>
    </ul>
  </nav>
  );
}

export default BannerComponent;
