import React from 'react';
import { useNavigate } from 'react-router';
import noImage from '../../asserts/images/no_image.jpg';

const Item = ({ id, filename, name }) => {
  const navigate = useNavigate();

  const redirectToItem = (id) => {
    navigate({ pathname: `/items/${id}` });
  };
  return (
    <div
      className="col-sm-12 col-md-3 d-flex my-5 d-flex justify-content-center align-item-center"
      key={id}
    >
      <div className="card img-item-container">
        <img
          src={
            filename
              ? `${process.env.REACT_APP_SERVER_STATIC_FILE_ATTACH}/${filename}`
              : noImage
          }
          className="card-img-top img-item"
          alt={id}
        />
        <div className="img-hover-button d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => redirectToItem(id)}
          >
            Booking
          </button>
        </div>
        <div className="card-body">
          <span className="badge  bg-secondary">{name}</span>
        </div>
        <div className="img-bg-transition"></div>
      </div>
    </div>
  );
};

export default Item;
