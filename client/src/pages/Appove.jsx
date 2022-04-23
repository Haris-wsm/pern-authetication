import React, { useContext, useEffect, useState } from 'react';
import Table from '../components/Table';
import { LocalStorage } from '../contexts/useLocalStorage';
import request from '../api/authReqest';
import UserTable from '../components/UserTable';
import ItemTable from '../components/ItemTable';

const lists = [
  { title: 'Booking History' },
  { title: 'User Roles' },
  { title: 'Items Setting' }
];
const Appove = () => {
  const [tap, SetTap] = useState('Booking History');
  const [items, setItems] = useState([]);

  const { userToken } = useContext(LocalStorage);

  request.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${userToken.token}`;

  useEffect(() => {
    const getBooking = async () => {
      try {
        const res = await request.get(`/bookings/${userToken.id}`);
        setItems(res.data.bookings);
      } catch (error) {
        console.log(error.response);
      }
    };
    getBooking();
  }, []);

  const handleSetTap = (menu) => {
    SetTap(menu);
  };

  const handleFindItem = (id, status) => {
    setItems(
      items.map((item) => {
        return item.id === id ? { ...item, status } : item;
      })
    );
  };

  return (
    <div className="container py-2 w-100 h-100">
      <div className="setting-booking">
        <div className="title">
          <h1 className="display-5">Booking Management</h1>
          <hr />
          <div
            className="d-flex justify-content-end align-items-end mt-4 "
            style={{ gap: 12 }}
          >
            <div className="search d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="form-text text-secondary">Filter items</div>

              <select
                className="form-select mw-20"
                aria-label="Default select example"
              >
                <option value="" disabled>
                  Following
                </option>
                <option value="1">Status pending</option>
                <option value="2">Status reject</option>
                <option value="3">By newest</option>
                <option value="3">By oldest</option>
              </select>
            </div>
          </div>

          <ul className="nav nav-tabs mt-1">
            {lists.map((list, i) => (
              <li
                className="nav-item"
                key={i}
                onClick={() => handleSetTap(list.title)}
                name={list.title}
              >
                <a className={`nav-link ${tap === list.title && 'active'}`}>
                  {list.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container py-4 w-100 h-100">
        {tap === lists[0].title ? (
          <div className="container">
            <div className="table-responsive py-5">
              <Table lists={items} isAdmin updateItem={handleFindItem} />
            </div>
          </div>
        ) : tap === lists[1].title ? (
          <div className="container">
            <div className="table-responsive py-5">
              <UserTable />
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="table-responsive py-5">
              <ItemTable />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appove;
