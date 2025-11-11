import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layouts from './layout/Layouts';
import Home from './pages/Home';
import Components from './pages/Components';
import Animation from './Components/Animation';
import Calculator from './Components/Calculator';
import Todos from './Components/Todos';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './pages/cart'; 
import { fetchProducts } from './data/products';

function App() {
  const [token, settoken] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const Lsuccess = (userData) => {
    settoken(userData);
  };

  const Logout = () => {
    settoken(null);
  };

  const onAddToCart = (productToAdd) => {
    setCart((c) => {
      const ei = c.find(item => item.id === productToAdd.id);
      if (ei) {
        return c.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...c, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    fetchProductsData();
  }, []);

  if (!token) {
    return (
      <BrowserRouter basename="/csi205">
        <Routes>
          <Route path="/" element={<Login Lsuccess={Lsuccess} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  const totalI = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <BrowserRouter basename="/csi205">
      <Routes>
        <Route path="/" element={<Layouts token={token} Logout={Logout} cartItemsCount={totalI} />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="components" element={<Components />} />
          <Route path="animation" element={<Animation />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="products" element={<Products products={products} onAddToCart={onAddToCart} />} />
          <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="todos" element={<Todos />} />
          <Route path="*" element={
            <div className="text-center p-10">
              <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;