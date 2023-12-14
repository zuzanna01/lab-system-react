import React from 'react';
import './Banner.css';
import Logo from './Logo';
import { useUser } from './UserContext';
import { FaPowerOff } from 'react-icons/fa'; 

function BannerComponent() {
  const { user, setUser, setIsLoggedIn } = useUser();

  const handleUserDetailsClick = () => {
    window.location.href = '/user';
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/home';
  };

  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <Logo />
        <li className="nav-item">katalog badań</li>
        <li className="nav-item" onClick={event => window.location.href = '/result'}>odbierz wyniki</li>
        <li className="nav-item">poradnik</li>
        {user ? (
          <React.Fragment>
            <li className="nav-item" onClick={handleUserDetailsClick}>{`${user.name} ${user.lastname}`}</li>
            <li className="nav-item logout-btn" onClick={handleLogout}>
              <FaPowerOff /> 
            </li>
          </React.Fragment>
        ) : (
          <li className="nav-item" onClick={event => window.location.href = '/login'}>Zaloguj się</li>
        )}
      </ul>
    </nav>
  );
}

export default BannerComponent;
