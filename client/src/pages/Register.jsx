import React, { useContext, useState } from 'react';
import InputFormPassword from '../components/form/InputFormPassword';
import { LocalStorage } from '../contexts/useLocalStorage';
import request from '../api/authReqest';
import { useNavigate } from 'react-router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conFirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handlePasswordConfirm = async (e) => {
    e.preventDefault();

    password !== conFirmPassword
      ? setErrors({ ...errors, confirmPassword: `Password does't match` })
      : setErrors({});
    await handleSubmit();
  };

  const handleSubmit = async () => {
    const body = {
      username,
      email,
      password,
      role
    };

    try {
      const res = await request.post('/users', body);
      navigate('/register/sendmail', { state: { email } });
    } catch (error) {
      console.log(error.response.data);
    }

    // request.defaults.headers.common['Authorization'] = `Bearer `
  };

  const handleChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeChecked = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <div className="content"></div>
      <div className="content-form">
        <h2 className="display-2 text-uppercase text-center text-white">
          REGISTER
        </h2>
        <div className="content-form-card mt-2 px-2 py-1" autoComplete="off">
          <input type="text" style={{ display: 'none' }} />
          <input type="password" style={{ display: 'none' }} />
          <div className="form-group mb-4 w-100">
            <label htmlFor="username" className="text-white">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={handleChangeUser}
              value={username}
              name="username"
              autoComplete="rutjfkde"
            />
          </div>
          <div className="form-group mb-4 w-100">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={handleChangeEmail}
              value={email}
              name="email"
              autoComplete="rutjfkde"
            />
          </div>
          <div className="form-group mb-4 w-100">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <InputFormPassword
              value={password}
              setPassword={setPassword}
              id={'password'}
            />
          </div>

          <div className="form-group mb-4 w-100">
            <label htmlFor="password-confirm" className="text-white">
              Confirm Password
            </label>

            <InputFormPassword
              value={conFirmPassword}
              setPassword={setConfirmPassword}
              id={'password-confirm'}
            />
          </div>

          <div className="mb-3 d-flex justify-content-evenly align-items-center">
            <div className="form-check  ">
              <input
                className="form-check-input"
                type="checkbox"
                value="teacher"
                name="role[]"
                onChange={handleChangeChecked}
                checked={role === 'teacher'}
              />
              <small id="emailHelp" className="form-text text-white">
                Teacher
              </small>
            </div>
            <div className="form-check  ">
              <input
                className="form-check-input"
                type="checkbox"
                value="student"
                name="role[]"
                onChange={handleChangeChecked}
                checked={role === 'student'}
              />
              <small id="emailHelp" className="form-text text-white">
                Student
              </small>
            </div>
          </div>

          <div className="mb-4 w-100"></div>
          <div className="d-flex justify-content-end w-100">
            <button className="btn btn-primary" onClick={handlePasswordConfirm}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
