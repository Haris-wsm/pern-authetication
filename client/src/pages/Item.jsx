import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import request from '../api/authReqest';
import { LocalStorage } from '../contexts/useLocalStorage';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const { userToken } = useContext(LocalStorage);
  const [total, setTotal] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await request.get(`/items/${id}`);
        console.log(res.data);
        setItem(res.data.item);
      } catch (error) {
        console.log(error.response);
      }
    };

    getItem();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    request.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${userToken.token}`;

    try {
      await request.post(`/items/${item.id}/booking`, { total });
      navigate({ pathname: '/' });
    } catch (error) {}
  };

  return (
    <div className="container py-4 w-100 h-100">
      <div className="setting-booking">
        <div className="title">
          <h1 className="display-5">Booking</h1>
          <hr />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-2 py-4 px-4 ">
            <div className="item-title d-flex justify-content-center">
              <p className="lead">{item.name}</p>
            </div>
            <div className="card card-single">
              <img
                src={`${process.env.REACT_APP_SERVER_STATIC_FILE_ATTACH}/${item?.file_attachment?.filename}`}
                className="card-img-top img-item img-item-single "
                alt={item.id}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mt-2 py-4">
            <form className="px-3">
              <div className="mb-3">
                <label htmlFor="totalBooking" className="form-label">
                  Total
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="totalBooking"
                  min={1}
                  onChange={(e) => setTotal(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  Number of item that nedd to book
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
