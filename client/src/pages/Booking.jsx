import React, { useContext, useEffect, useState } from 'react';
import request from '../api/authReqest';
import Table from '../components/Table';
import { LocalStorage } from '../contexts/useLocalStorage';

const Booking = () => {
  const { userToken } = useContext(LocalStorage);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getBooking = async () => {
      request.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userToken.token}`;
      try {
        const res = await request.get(`/bookings/${userToken.id}`);
        setItems(res.data.bookings);
      } catch (error) {
        console.log(error.response);
      }
    };
    getBooking();
  }, []);

  return (
    <div className="container py-4 w-100 h-100">
      <div className="setting-booking">
        <div className="title">
          <h1 className="display-5">My Booking</h1>
          <hr />
        </div>
      </div>
      <div className="container">
        <div className="table-responsive py-5">
          <Table lists={items} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
