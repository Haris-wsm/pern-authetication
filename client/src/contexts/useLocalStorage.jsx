import React, { useState, createContext } from 'react';

export const LocalStorage = createContext();

export const LocalStorageProvider = ({ children }) => {
  const [userToken, setToken] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const handleSetToken = (value) => {
    localStorage.setItem('user', JSON.stringify(value));
    setToken(value);
  };

  const clearToken = () => {
    localStorage.removeItem('user');
    setToken('');
  };

  return (
    <LocalStorage.Provider
      value={{ userToken, setToken, handleSetToken, clearToken }}
    >
      {children}
    </LocalStorage.Provider>
  );
};
