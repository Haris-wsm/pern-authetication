import React, { useEffect, useState } from 'react';
import request from '../api/authReqest';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

import noImage from '../asserts/images/no_image.jpg';

const ItemTable = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await request.get('/items');
        setItems(res.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  const handleRedirectToEdit = (id) => {
    navigate({ pathname: `/edit/${id}` });
  };

  const handleDelete = async (id) => {
    try {
      await request.delete(`/items/${id}`);
      handleRemoveInList(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveInList = (id) => {
    setItems((prev) => [...prev.filter((p) => p.id !== id)]);
  };

  return (
    <>
      <div className="setting-content mb-2">
        <div className="header d-flex justify-content-between">
          <h4>All items</h4>
        </div>
      </div>
      <table className="table table-borderless">
        <thead>
          <tr className="bg-primary text-white">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col ">
              <i className="fa-solid fa-image"></i>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{item.name}</td>
              <td>{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
              <td>
                <img
                  src={
                    item.file_attachment
                      ? `${process.env.REACT_APP_SERVER_STATIC_FILE_ATTACH}/${item.file_attachment.filename}`
                      : noImage
                  }
                  alt={i}
                  className="rounded-circle"
                  style={{ width: 48, height: 48, objectFit: 'contain' }}
                />
              </td>
              <td>
                <div className="d-flex flex-wrap">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mx-1 my-1 w-50"
                    onClick={() => handleRedirectToEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm mx-1 my-1 w-50"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ItemTable;
