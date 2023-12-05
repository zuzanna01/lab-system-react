import React ,{useEffect} from 'react';
import './UserDetails.css';
import {BiUserCircle} from 'react-icons/bi';
import { useUser } from './UserContext';
import { request ,setAuthHeader} from './AxiosHelper';


function UserDetails() {
    const { user ,setUser, setIsLoggedIn} = useUser();

    
    useEffect(() => {
        request(
            "GET",
            "/user/details"
        ).then((response) => {
                setUser(response.data);
                setIsLoggedIn(true)
            }).catch((error) => {
                setAuthHeader(null);
                setUser(null);
                setIsLoggedIn(false)
            }
        );
    }, []);


    return (
        <div className="user-details">
            <div className="left-side">
                <p className="description">Imię i nazwisko</p>
                {user ? ( <p>{user.name} {user.lastname} </p>) : (<p>JADJASHD</p>)}  
                <p className="description">PESEL</p>
                {user ? ( <p>{user.pesel}</p>) : (<p>pesel</p>)}  
            </div>
            <div className="right-side">
                <p className="description">Numer telefonu</p>
                {user ? ( <p>{user.phoneNumber}</p>) : (<p>phone</p>)}  
                <p className="description">E-mail</p>
                {user ? ( <p>{user.e_mail}</p>) : (<p>e_mail</p>)}  
            </div>
            <BiUserCircle className='user-icon'/>
        </div>
       
    )
}
export default UserDetails;
