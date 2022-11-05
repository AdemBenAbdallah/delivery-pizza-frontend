import axios from "axios";
import React, { useEffect, useState } from "react";
import img from "../img/pizza.png";
import "./admin.css";

const Admin = () => {
  const [data, setData] = useState({ products: [], orders: [] });
  const status = ["preparing", "on the way", "delivered"];

  useEffect(() => {
    const handleData = async () => {
      try {
        const resProducts = await axios.get(
          "http://localhost:8800/api/product"
        );
        const resOrders = await axios.get("http://localhost:8800/api/order");
        setData({ products: resProducts.data, orders: resOrders.data });
      } catch (error) {
        console.log(error);
      }
    };
    handleData();
  }, []);

  const handleSumbit = async (id, status) => {
    if (status < 2) {
      try {
        await axios.put(`http://localhost:8800/api/order/${id}`);
        const order = await axios.get(`http://localhost:8800/api/order/${id}`);
        setData({
          products: [...data.products],
          orders: [
            order.data[0],
            ...data.orders.filter((order) => order._id !== id),
          ],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8800/api/product/${id}`);
        setData({
          products: [...data.products.filter((product) => product._id !== id)],
          orders: [...data.orders],
        });
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="admin">
      <div className="products">
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr>
                <td>
                  <div className="img">
                    <img src={img} alt="img" />
                  </div>
                </td>
                <td>
                  <div className="id">{product._id}</div>
                </td>
                <td>
                  <div className="title">{product.title}</div>
                </td>
                <td>
                  <div className="price">${product.prices[0]}</div>
                </td>
                <td>
                  <div className="action">
                    <button>Edit</button>
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="order">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr>
                <td>
                  <div className="id">{order._id}</div>
                </td>
                <td>
                  <div className="customer">{order.customer}</div>
                </td>
                <td>
                  <div className="total">${order.total}</div>
                </td>
                <td>
                  <div className="payment">
                    {order.method === 0 ? "paid" : "cash"}
                  </div>
                </td>
                <td>
                  <div className="status">{status[order.status]}</div>
                </td>
                <td>
                  <div className="action">
                    <button
                      onClick={() => handleSumbit(order._id, order.status)}
                    >
                      Next Storage
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
