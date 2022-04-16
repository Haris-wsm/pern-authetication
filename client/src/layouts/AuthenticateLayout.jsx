import React from 'react';

const AuthenticateLayout = ({ children }) => {
  return (
    <div className="container mw-100 min-vh-100 d-flex justify-content-center align-items-center container-login">
      {children}
    </div>
  );
};

export default AuthenticateLayout;
