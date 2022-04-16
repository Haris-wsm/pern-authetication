import React, { useState, createContext } from 'react';

export const LocalStorage = createContext();

export const LocalStorageProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('user')) || ''
  );

  const handleSetToken = (value) => {
    localStorage.setItem('user', JSON.stringify(value));
    setToken(value);
  };

  return (
    <LocalStorage.Provider value={{ token, setToken, handleSetToken }}>
      {children}
    </LocalStorage.Provider>
  );
};
