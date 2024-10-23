import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./screens/Home";
import "./index.css";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import MyOrders from "./screens/myOrders.jsx"; 
import Login from "./screens/Login";
import Signup from "./screens/Signup.jsx";
import { CartProvider } from "./comp/ContextRed.jsx";
import Cart from "./screens/Cart.jsx";
export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/myOrders" element={<MyOrders/>}></Route>


        </Routes>
       </div>
  );
}
