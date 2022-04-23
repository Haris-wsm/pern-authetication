import React, { useState } from 'react';
import dayjs from 'dayjs';
import request from '../api/authReqest';

const bookingStatus = [
  {
    status: 'pennding',
    class: 'bg-secondary',
    icon: 'fa-regular fa-hourglass mx-2'
  },
  {
    status: 'submit',
    class: 'bg-primary',
    icon: 'fa-solid fa-circle-check mx-2'
  },
  {
    status: 'reject',
    class: 'bg-warning text-dark',
    icon: 'fa-solid fa-ban mx-2'
  }
];
const Table = ({ lists, isAdmin, updateItem }) => {
  const getStatus = (status) => {
    return bookingStatus
      .filter((item) => item.status === status)
      .map((c, i) => (
        <span
          className={`badge ${c.class} px-2 py-1 my-3`}
          key={i}
          style={{ fontSize: '1em' }}
        >
          {status} <i className={c.icon}></i>
        </span>
      ));
  };

  const handleAccept = async (id) => {
    const body = {
      date: new Date(),
      status: 'submit'
    };

    try {
      const res = await request.post(`/bookings/${id}`, body);

      updateItem(res.data.booking.id, res.data.booking.status);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async (id) => {
    const body = {
      date: new Date(),
      status: 'reject'
    };

    try {
      const res = await request.post(`/bookings/${id}`, body);
      updateItem(res.data.booking.id, res.data.booking.status);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <table className="table table-borderless">
      <thead>
        <tr className="bg-primary text-white">
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">
            <i className="fa-regular fa-clock"></i> Date
          </th>
          <th scope="col">
            Status <i className="fa-solid fa-flag-usa"></i>
          </th>
          <th scope="col">
            <i className="fa-solid fa-image"></i>
          </th>
          {isAdmin && (
            <>
              <th scope="col">Username</th>
              <th scope="col"></th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="table-booking">
        {lists.map((item, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{item.item.name}</td>
            <td>{dayjs(item.date).format('YYYY-MM-DD')}</td>
            <td>{getStatus(item.status)}</td>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src={`${process.env.REACT_APP_SERVER_STATIC_FILE_ATTACH}/${item.item.file_attachment.filename}`}
                  alt={i}
                  className="rounded-circle"
                  style={{ width: 48, height: 48, objectFit: 'contain' }}
                />
              </div>
            </td>
            {isAdmin && (
              <>
                <td>{item.user.username}</td>
                <td className="d-flex justify-content-center align-items-center py-2">
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm mx-3"
                      onClick={() => {
                        handleAccept(item.id);
                      }}
                      disabled={item.status === 'submit'}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleReject(item.id)}
                      disabled={item.status === 'reject'}
                    >
                      Danger
                    </button>
                  </div>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
