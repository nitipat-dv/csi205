import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const Layouts = ({ token, Logout, cartItemsCount }) => {
  return (
    <div className="w-[1020px] mx-auto my-10 bg-white shadow-lg overflow-hidden border">
      <Header /> 
      <Navbar token={token} Logout={Logout} cartItemsCount={cartItemsCount} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layouts;