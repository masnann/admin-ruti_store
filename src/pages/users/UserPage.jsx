
// src/components/pages/Home.jsx
import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
    return (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <h1 className="text-2xl font-bold mb-4">Customer</h1>
            {/* Konten Dashboard lainnya */}
          </div>
        </div>
      );
};

export default Home;