import React from 'react';

const AuthenticateLayout = ({ children }) => {
  return (
    <div className="container container-login mw-100 min-vh-100 d-flex justify-content-center align-items-center ">
      {children}
    </div>
  );
};

export default AuthenticateLayout;
