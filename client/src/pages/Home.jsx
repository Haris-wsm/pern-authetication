import React from 'react';
import ItemsList from '../components/home/ItemsList';
import Navbar from '../components/home/Navbar';

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <ItemsList />
    </div>
  );
};

export default Home;
