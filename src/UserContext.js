import React, { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider (props) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn
  }



  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

export function useUser () {
  return useContext(UserContext);
};