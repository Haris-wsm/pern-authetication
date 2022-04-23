import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import request from '../api/authReqest';

const EditItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState({ name: '' });
  const [name, setName] = useState('');

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await request.get(`/items/${id}`);

        setItem(res.data.item);
        setName(res.data.item.name);
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, []);

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await request.put(`/items/${id}`, { name: item.name });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-2 w-100 h-100">
      <div className="setting-booking">
        <div className="title">
          <h1 className="display-5">{name}</h1>
          <hr />
        </div>
      </div>
      <div className="container my-4">
        <div className="row p-3">
          <div className="col-md-6 co-sm-12">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                  name="name"
                  value={item?.name}
                  onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  An item's name
                </small>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 co-sm-12 d-flex justify-content-center">
            <div className="" style={{ width: 200, height: 200 }}>
              <img
                src={`${
                  item.file_attachment &&
                  process.env.REACT_APP_SERVER_STATIC_FILE_ATTACH
                }/${item?.file_attachment?.filename}`}
                className="img-fluid"
                alt="Responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
