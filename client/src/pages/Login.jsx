import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsShow(!isShow);
  };

  const handleRedirectToRegister = (e) => {
    e.preventDefault();
    navigate({ pathname: '/register' });
  };

  return (
    <>
      <div className="content"></div>
      <div className="content-form">
        <h2 className="display-2 text-uppercase text-center text-white">
          Login
        </h2>
        <form className="content-form-card mt-2 px-2 py-1">
          <div className="form-group mb-4 w-100">
            <label htmlFor="username" className="text-white">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mb-4 w-100">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <div className="d-flex justify-contents-center align-items-center">
              <div className="input-password w-100 bg-white h-auto d-flex align-items-center">
                <input
                  type={isShow ? 'text' : 'password'}
                  className="form-control"
                  id="username"
                  placeholder="Enter password"
                />
                <span
                  className="content-form-icon px-2"
                  role="button"
                  onClick={handleToggle}
                >
                  {isShow ? (
                    <i className="fa-solid fa-eye " />
                  ) : (
                    <i className="fa-solid fa-eye-slash " />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4 w-100">
            <small id="emailHelp" className="form-text text-muted">
              New User?
            </small>
            <span className="badge badge-secondary" role="button">
              <Link to="/register">Register</Link>
            </span>
          </div>
          <div className="d-flex justify-content-end w-100">
            <button
              className="btn btn-primary"
              onClick={handleRedirectToRegister}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
