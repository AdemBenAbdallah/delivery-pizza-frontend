import React from "react";
import telephone from "../../img/telephone.png";
import logo from "../../img/logo.png";
import cart from "../../img/cart.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../navbar/navbar.css";


const Navbar = () => {
  const Navigate = useNavigate();
  const counter = useSelector((state) => state.counter.counter);
  const isAdmin = useSelector((state) => state.admin.admin);

  return (
    <div className="container">
      <div className="item">
        <div className="callButton">
          <img src={telephone} width="34px" height="34px" alt="button" />
        </div>
        <div className="texts">
          <div className="text">ORDER NOW!</div>
          <div className="text">23 919 861</div>
        </div>
      </div>
      <div className="item">
        <ul className="list">
          <li className="listItem" onClick={() => Navigate("/")}>
            Homepage
          </li>
          <li className="listItem" onClick={() => Navigate('/products')}>Products</li>
          <img
            src={logo}
            width="50px"
            height="50px"
            alt="logo"
            style={{ borderRadius: "50%" }}
          />
          <li className="listItem">Menu</li>
          <li className="listItem">Blogs</li>
          {isAdmin && (
            <li className="listItem" onClick={() => Navigate("/admin")}>
              Dashbord
            </li>
          )}
        </ul>
      </div>
      <div className="item">
      <img  onClick={() => Navigate('/')} src={logo} alt="home" width="40px" className="home"/>
        <div className="cart" style={{ cursor: "pointer" }}>
          <img
            src={cart}
            width="40px"
            height="40px"
            onClick={() => Navigate("/cart")}
            alt="cart"
          />
          <div className="counter">{counter}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;