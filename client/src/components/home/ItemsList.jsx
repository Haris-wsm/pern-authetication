import React from 'react';
import drill from '../../asserts/images/drill.png';
import hammer from '../../asserts/images/hammer.png';
import screwdriver from '../../asserts/images/screwdriver.png';
import wrench from '../../asserts/images/wrench.png';

const items = [
  { image: drill, name: 'Drill' },
  { image: hammer, name: 'Hammer' },
  { image: screwdriver, name: 'Screwdriver' },
  { image: wrench, name: 'Wrench' }
];

const ItemsList = () => {
  const handleClick = () => {
    console.log('hello');
  };
  return (
    <div className="container">
      <div className="row">
        {items.map((item, i) => (
          <div
            className="col-sm-12 col-md-3 d-flex my-5 d-flex justify-content-center align-item-center"
            key={i}
          >
            <div className="card img-item-container">
              <img src={item.image} className="card-img-top img-item" alt={i} />
              <div className="img-hover-button d-flex justify-content-center align-items-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Booking
                </button>
              </div>
              <div className="card-body">
                <span className="badge  bg-secondary">{item.name}</span>
              </div>
              <div className="img-bg-transition"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
