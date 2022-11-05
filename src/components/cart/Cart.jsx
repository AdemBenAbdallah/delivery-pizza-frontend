import React, { useState } from "react";
import pizza from "../../img/pizza.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.css";

const Cart = () => {
  const order = useSelector((state) => state.order.product);
  const [display, setDisplay] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleUser = (id, value) => {
    setUser({ ...user, [id]: value });
  };

  let total = 0;
  const handleTotal = () => {
    order.forEach((product) => {
      total += product.total;
    });
    return total;
  };

  const handleSumbit = async () => {
    try {
      const order = await axios.post("http://localhost:8800/api/order", {
        customer: user.name,
        address: user.address,
        total,
        status: 0,
        method: 2,
      });
      navigate(`/orders/${order.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cash">
      <div className="cart">
        <div className="left">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            {order.slice(1).map((item, i) => (
              <tbody key={i}>
                <tr >
                  <td>
                    <div className="img">
                      <img src={pizza} alt="pizza" width="40px" />
                    </div>
                  </td>
                  <td className="desc">
                    <span>{item.name}</span>
                  </td>
                  <td className="extras">
                    {item.extraOptions.map((option, i) => {
                      return <span key={i}>{option}</span>;
                    })}
                  </td>
                  <td className="price">
                    <span>${item.price}</span>
                  </td>
                  <td className="quantity">
                    <span>{item.quantity}</span>
                  </td>
                  <td className="total">
                    <span>${item.total}</span>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="right">
          <h2>CART TOTAL</h2>
          <div className="desc">
            <p>
              Subtotal : <span>${handleTotal()}</span>
            </p>
            <p>
              Discount : <span>$0.00</span>
            </p>
            <p>
              Total : <span>${handleTotal()}</span>
            </p>
          </div>

          {display ? (
            <button
              style={{ color: "#51ad51" }}
              onClick={() => setDelivery((prev) => !prev)}
            >
              CASH ON DELIVERY
            </button>
          ) : (
            <button onClick={() => setDisplay((prev) => !prev)}>
              CHECKOUT NOW!
            </button>
          )}
          {delivery && (
            <>
              <div
                className="delivery"
                onClick={() => setDelivery((prev) => !prev)}
              ></div>
              <div className="dev">
                <div className="box">
                  <h2>You Will pay 7D after delivery</h2>
                  <div className="input">
                    <p>Name Surname</p>
                    <input
                      type="text"
                      placeholder="name and surname"
                      id="name"
                      onChange={(e) => handleUser(e.target.id, e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <p>Name Surname</p>
                    <input
                      type="number"
                      placeholder="+216 23 454 678"
                      id="phone"
                      onChange={(e) => handleUser(e.target.id, e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <p>Name Surname</p>
                    <textarea
                      type="text"
                      placeholder="Your address"
                      id="address"
                      onChange={(e) => handleUser(e.target.id, e.target.value)}
                    />
                  </div>
                  <button onClick={() => handleSumbit()}>order</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
