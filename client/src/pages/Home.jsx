import React, { useContext, useState } from 'react';
import NoUserImage from '../asserts/images/no_user.png';

import { LocalStorage } from '../contexts/useLocalStorage';
import request from '../api/authReqest';

const Home = () => {
  const { clearToken, token } = useContext(LocalStorage);
  const [isOpen, setIsOpen] = useState(true);

  const logout = async () => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      await request.post('/logout');

      clearToken();
    } catch (error) {
      console.log(error.response.body);
    }
  };

  const handleOpenSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="logo-content">
          <div className="logo">
            <i className="fa-solid fa-cubes"></i>
            <div className="logo-name">ABC Booking</div>
          </div>
          <i
            className="fa-solid fa-bars"
            id="btn"
            onClick={handleOpenSidebarToggle}
          ></i>
        </div>
        <ul className="nav-list">
          <li>
            <a href="">
              <i className="fa-solid fa-book-atlas"></i>
              <span className="links-name">Dashboard</span>
            </a>
            <span className="tooltip-menu">Dashboard</span>
          </li>
          <li>
            <a href="">
              <i className="fa-regular fa-calendar-check"></i>
              <span className="links-name">Booking</span>
            </a>
            <span className="tooltip-menu">Booking</span>
          </li>
          <li>
            <a href="">
              <i className="fa-solid fa-user-gear"></i>
              <span className="links-name">Profile</span>
            </a>
            <span className="tooltip-menu">Profile</span>
          </li>
        </ul>

        <div className="profile-content">
          <div className="profile">
            <div className="profile-details">
              <img src={NoUserImage} alt="no-user" />
              <div className="name-job">
                <div className="name">Haris Waesamah</div>
              </div>
            </div>
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              id="log-out"
              onClick={logout}
            ></i>
          </div>
        </div>
      </div>

      <div className="home-content">
        <div className="text">Home Page</div>
      </div>
    </div>
  );
};

export default Home;
