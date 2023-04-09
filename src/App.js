import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Cart from './component/Cart'
import Header from './component/Header'
import Footer from './component/Footer'
import ProductDetailsPage from './component/ProductDetailsPage';

function App() {
  const [cart, setCart] = useState([]);
  // localStorage.removeItem('cart')
  const handleAddToCart = (productInfo) => {

    console.log(localStorage.cart)
    const checkCart = () => localStorage.cart ? JSON.parse(localStorage.cart) : JSON.parse('[{"id":0,"title":"","price":0,"description":"","category":"","image":"","quantity":1}]')

    const item = checkCart().find((item) => item.id === productInfo.id )

    if(item)
    {
      item.quantity += 1
      const newCart = JSON.parse(localStorage.cart).filter( (item) => item.id !== productInfo.id )
      localStorage.cart = JSON.stringify([...newCart,item])
      return setCart([...newCart,item])
    }else{
      localStorage.cart = (localStorage.cart) ?  JSON.stringify([...JSON.parse(localStorage.cart),{...productInfo,quantity:1}]) : JSON.stringify([{...productInfo,quantity:1}])
      return setCart([...localStorage.cart,{...productInfo,quantity:1}])
    }
};

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home cart={cart} cartSet={setCart} handleAddToCartfunction={handleAddToCart} />} />
        <Route path='/cart' element={<Cart cart={cart} cartSet={setCart} />} />
        <Route path='/product/:id' element={<ProductDetailsPage cart={cart} cartSet={setCart} handleAddToCartfunction={handleAddToCart} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
