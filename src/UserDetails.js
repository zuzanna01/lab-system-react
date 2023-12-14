import React, { useEffect }  from 'react';
import './UserDetails.css';
import {BiUserCircle} from 'react-icons/bi';
import { useUser } from './UserContext';
import { request} from './AxiosHelper';

function UserDetails() {
  const { user, setUser, setIsLoggedIn} = useUser();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await request('GET', '/user/details');
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
           window.location.href = '/unauthorized';
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    };

    fetchUserDetails(); 
}, []);

    return (
        <div className="user-details">
            <div className="left-side">
                <p className="description">Imię i nazwisko</p>
                {user ? ( <p>{user.name} {user.lastname} </p>) : (<p></p>)}  
                <p className="description">PESEL</p>
                {user ? ( <p>{user.pesel}</p>) : (<p></p>)}  
            </div>
            <div className="right-side">
                <p className="description">Numer telefonu</p>
                {user ? ( <p>{user.phoneNumber}</p>) : (<p></p>)}  
                <p className="description">E-mail</p>
                {user ? ( <p>{user.email}</p>) : (<p></p>)}  
            </div>
            <BiUserCircle className='user-icon'/>
        </div>
       
    )
}
export default UserDetails;
