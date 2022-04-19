import React, { useState } from 'react';

const Navbar = () => {
  const [filter, setFilter] = useState('');
  return (
    <div className="d-flex justify-content-between align-items-end mt-4 pb-2 navbar-home">
      <div className="search d-flex align-items-center">
        <input type="text" className="form-control" placeholder="Search..." />
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="form-text text-secondary">Filter items</div>

        <select
          className="form-select w-20"
          aria-label="Default select example"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="" disabled>
            Following
          </option>
          <option value="1">Ascending</option>
          <option value="2">Decending</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
