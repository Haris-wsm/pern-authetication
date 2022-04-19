import React from 'react';
import { useLocation } from 'react-router';

const SendEmail = () => {
  const location = useLocation();

  return (
    <>
      <div className="content"></div>
      <div className="content-form">
        <h2 className="display-5 text-uppercase text-center text-white">
          Email is sent
        </h2>
        <div className="d-flex my-4">
          <p className="text-white mx-3">Please confirm at email</p>
          <p class="badge rounded-pill bg-light text-dark">
            {location.state?.email}
          </p>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
