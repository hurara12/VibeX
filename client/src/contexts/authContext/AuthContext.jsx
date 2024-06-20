import React, { createContext, useContext, useState } from 'react';
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('jwtToken'));

  const login = newToken => {
    setToken(newToken);
    Cookies.set('jwtToken', newToken);
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('jwtToken');
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);