import React, { useEffect, useState } from 'react';
import request from '../../api/authReqest';
import Item from './Item';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await request.get('/items');
        setItems(res.data.items);
      } catch (error) {
        console.log(error.response);
      }
    };

    getItems();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {items?.map(({ id, file_attachment, name }) => (
          <Item
            id={id}
            filename={file_attachment?.filename}
            name={name}
            key={id}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
