import React, { useEffect, useState } from "react";
import "./orders.css";
import paid from "../../img/paid.png";
import checked from "../../img/checked.png";
import bike from "../../img/bike.png";
import bake from "../../img/bake.png";
import deliverd from "../../img/delivered.png";
import { useParams } from "react-router";
import axios from "axios";

const Orders = () => {
  const [orderInfo, setOrderInfo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const order = await axios.get(`http://localhost:8800/api/order/${id}`);
        setOrderInfo(order.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [id]);

  const statusClass = (index) => {
    if (index -  orderInfo[0].status  <= 0) return "done";
      else if (index -  orderInfo[0].status === 1) return "inProssing";
    else return "undone";
  };
  
  console.log(orderInfo[0] && orderInfo[0].status);
  return (
    <div className="payment">
      <div className="cart">
        <div className="left">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>

            {orderInfo.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td>
                    <div className="img">
                      <p>{order._id}</p>
                    </div>
                  </td>
                  <td className="desc">
                    <span>{order.customer}</span>
                  </td>
                  <td className="extras">
                    <span>{order.address}</span>
                  </td>
                  <td className="total">
                    <span>${order.total}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={statusClass(0)}>
                      <img src={bike} alt="payement" width="40px" />
                      <p style={{ fontSize: "12px" }}>Payment</p>
                      <img src={checked} alt="checked" width="20px" />
                    </div>
                  </td>
                  <td>
                    <div className={statusClass(1)}>
                      <img src={paid} alt="payement" width="40px" />
                      <p style={{ fontSize: "12px" }}>Preparing</p>
                      <img src={checked} alt="checked" width="20px" />
                    </div>
                  </td>
                  <td>
                    <div className={statusClass(2)}>
                      <img src={bake} alt="payement" width="40px" />
                      <p style={{ fontSize: "12px" }}>On the way</p>
                      <img src={checked} alt="checked" width="20px" />
                    </div>
                  </td>
                  <td>
                    <div className={statusClass(3)}>
                      <img src={deliverd} alt="payement" width="40px" />
                      <p style={{ fontSize: "12px" }}>Delivered</p>
                      <img src={checked} alt="checked" width="20px" />
                    </div>
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
              Subtotal : <span>${orderInfo[0] && orderInfo[0].total}</span>
            </p>
            <p>
              Discount : <span>$0.00</span>
            </p>
            <p>
              Total : <span>${orderInfo[0] && orderInfo[0].total}</span>
            </p>
          </div>
          <button className="paid">PAID</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
