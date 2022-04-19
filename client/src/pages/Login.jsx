import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import InputFormPassword from '../components/form/InputFormPassword';
import request from '../api/authReqest';
import { LocalStorage } from '../contexts/useLocalStorage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');

  const { handleSetToken } = useContext(LocalStorage);

  useEffect(() => {
    const getActivativateAccount = async () => {
      try {
        const res = await request.post(`/users/token/${token}`);
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    token && getActivativateAccount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await request.post('/auth', { email, password });
      handleSetToken(res.data);
      navigate({ pathname: '/' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeChecked = (e) => {
    setRole(e.target.value);
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
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-4 w-100">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <div className="d-flex justify-contents-center align-items-center">
              <InputFormPassword
                value={password}
                setPassword={setPassword}
                id={'password'}
              />
            </div>
          </div>

          <div className="mb-4 d-flex justify-content-evenly align-items-center">
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

          <div className="mb-4 w-100">
            <small id="emailHelp" className="form-text text-muted">
              New User?
            </small>
            <span className="badge badge-secondary" role="button">
              <Link to="/register">Register</Link>
            </span>
          </div>
          <div className="d-flex justify-content-end w-100">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
