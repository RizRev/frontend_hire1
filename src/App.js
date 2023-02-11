// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Link, Routes, Navigate } from 'react-router-dom';
import Register from "../src/pages/register/index";
import Login from "../src/pages/login/index"
import Product from "../src/pages/product"

function App() {
  return (
    <div>
      <p>halo</p>
      <BrowserRouter>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/product'>Product</Link>
      <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/product' element={<Product/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
