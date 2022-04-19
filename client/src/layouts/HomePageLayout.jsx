import React, { useContext, useState } from 'react';
import NoUserImage from '../asserts/images/no_user.png';

import { LocalStorage } from '../contexts/useLocalStorage';
import request from '../api/authReqest';
import MenuRoutes from '../routes/MenuRoutes';
import { Link } from 'react-router-dom';

const HomePageLayout = ({ children }) => {
  const { clearToken, userToken } = useContext(LocalStorage);
  const [isOpen, setIsOpen] = useState(true);

  const { sidebarRoutes } = MenuRoutes();

  const logout = async () => {
    request.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userToken.token}`;

    try {
      await request.post('/logout');

      clearToken();
    } catch (error) {
      console.log(error.response?.body);
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
          {sidebarRoutes.map(({ id, path, icon, name }) => (
            <li key={id}>
              <Link to={path}>
                <i className={icon}></i>
                <span className="links-name">{name}</span>
              </Link>

              <span className="tooltip-menu">{name}</span>
            </li>
          ))}
        </ul>

        <div className="profile-content">
          <div className="profile">
            <div className="profile-details">
              <img src={NoUserImage} alt="no-user" />
              <div className="name-job">
                <div className="name">{`${userToken.username.substring(0, 15)}${
                  userToken.username.length > 15 ? '...' : ''
                }`}</div>
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

      <div className="home-content">{children}</div>
    </div>
  );
};

export default HomePageLayout;
