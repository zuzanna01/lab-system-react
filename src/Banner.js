
import React  from 'react';
import './Banner.css';
import Logo from './Logo';
import { useUser } from './UserContext';
import { request ,setAuthHeader} from './AxiosHelper';

function BannerComponent() {

  const { user, setUser, setIsLoggedIn } = useUser();

  const handleUserDetailsClick = () => {
    window.location.href = '/user'; 
  };


  return (
    <nav className="nav-bar">
    <ul className="nav-list">
      <Logo/>
      <li className="nav-item">katalog badań</li>
      <li className="nav-item" onClick={event =>  window.location.href='/result'}>odbierz wyniki</li>
      <li className="nav-item">poradnik</li>
      {user ? ( 
          <li className="nav-item" onClick={handleUserDetailsClick}>{`${user.name} ${user.lastname}`}</li>
      ) : (
        <li className="nav-item" onClick={event => window.location.href = '/login'}>Zaloguj się</li>
      )}
      </ul>
  </nav>
  );
}

export default BannerComponent;
