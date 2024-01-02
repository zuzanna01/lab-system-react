import { useEffect } from 'react';
import React from 'react';
import './Banner.css';
import Logo from './Logo';
import { useUser } from './UserContext';
import { FaPowerOff } from 'react-icons/fa'; 

function BannerComponent() {
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useUser();

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    const storedUserRole = sessionStorage.getItem('userRole');
    
    if (storedUserName && storedUserRole) {
      const storedUser = {
        userName: storedUserName,
        userRole: storedUserRole,
      };
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, [setUser, setIsLoggedIn]);
  
  const handleUserDetailsClick = () => {
    if (user.userRole === 'ROLE_PATIENT') {
        setIsLoggedIn(true);
        window.location.href = '/patient';
    } 
    
    if (user.userRole === 'ROLE_EMPLOYEE') {
        setIsLoggedIn(true);
        window.location.href = '/lab';
    } 
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.clear();
    window.location.href = '/home';
  };

  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <Logo/>
        <li className="nav-item" onClick={event => window.location.href = '/exams'}>katalog badań</li>
        <li className="nav-item" onClick={event => window.location.href = '/result'}>odbierz wyniki</li>
        <li className="nav-item">poradnik</li>
        {isLoggedIn ? (
          <React.Fragment>
            <li className="nav-item" onClick={handleUserDetailsClick}>{`${user.userName}`}</li>
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
