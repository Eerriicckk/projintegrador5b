import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 

import { BrowserRouter, Routes, Route, Navigate, useNavigate, NavLink, Link } from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import PageNotFound from './pages/PageNotFound';
import ListProducts from './pages/ListProducts/Index';
import { useEffect, useState } from 'react';
import LoginPage from './pages/Login/LoginPage';
import NavBar from './components/NavBar';
import AOS from 'aos';
import Product from './pages/Product/Index';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação em ms
      once: false,     // Só anima uma vez
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename='/projetointegrador5b'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/about' element={<About />} />
          <Route path='/company' element={<Navigate to="/about" />} />
          <Route path='/products' element={<ListProducts />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/search' element={<ListProducts />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
