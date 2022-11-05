import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Orders from "./components/orders/Orders";
import PizzaSection from "./components/pizza/PizzaSection";
import PizzaDetailes from "./components/pizzaDetails/PizzaDetailes";
import './App.css'
import Admin from './pages/Admin'
import Auth from "./components/auth/Auth";
import Products from "./components/products/Products";
import axios from "axios";


const App = () => {
  useEffect(() => {
    const handle = async () => {
      const res  = await axios.get("https://pizza-api-cx9q.onrender.com/api/product")
      console.log(res.data)
    }
    handle()
  },[])
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PizzaSection />} />
        <Route path='/products' element={<Products/>}/>
        <Route path="/pizza/:id" element={<PizzaDetailes />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:id" element={<Orders/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/login" element={<Auth/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
