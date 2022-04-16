import React, { useState } from 'react';

const Register = () => {
  const [isShow, setIsShow] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conFirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handlePasswordConfirm = (e) => {
    e.preventDefault();

    password !== conFirmPassword
      ? setErrors({ ...errors, confirmPassword: `Password does't match` })
      : setErrors({});

    console.log(errors);
  };

  return (
    <>
      <div className="content"></div>
      <div className="content-form">
        <h2 className="display-2 text-uppercase text-center text-white">
          REGISTER
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
              onChange={(e) => setUsername(e.target.values)}
              value={username}
              name="username"
            />
          </div>
          <div className="form-group mb-4 w-100">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <div className="d-flex justify-contents-center align-items-center">
              <input
                type={isShow ? 'text' : 'password'}
                className="form-control"
                id="username"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
              />
            </div>
          </div>

          <div className="form-group mb-4 w-100">
            <label htmlFor="password" className="text-white">
              Confirm Password
            </label>

            <input
              type={isShow ? 'text' : 'password'}
              className="form-control"
              id="username"
              placeholder="Enter Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={conFirmPassword}
              name="conFirmPassword"
            />

            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="mb-4 w-100"></div>
          <div className="d-flex justify-content-end w-100">
            <button className="btn btn-primary" onClick={handlePasswordConfirm}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
