import React, { useEffect, useState } from "react";
import PizzaCart from "./PizzaCart";
import "./pizza.css";
import Featured from "../featured/Featured";
import axios from "axios";
import { useSelector } from "react-redux";

const PizzaSection = () => {
  const [product, setProduct] = useState([]);
  const [display, setDisplay] = useState(false);
  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);
  const [gredients, setGredients] = useState([]);
  const [info, setInfo] = useState({
    title: "",
    desc: "",
    small: 0,
    meduim: 0,
    large: 0,
    url: "../../img/pizza.png",
  });
  const isAdmin = useSelector((state) => state.admin.admin);

  const handleChange = (id, value) => {
    setInfo({ ...info, [id]: value });
  };
  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      setProduct(data);
    };
    fetchData("http://localhost:8800/api/product");
  }, []);

  const add = (e) => {
    e.preventDefault();
    setGredients([...gredients, { text: text, price: price }]);
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const order = await axios.post("http://localhost:8800/api/product", {
        title: info.title,
        desc: info.desc,
        img: info.url,
        prices: [info.small, info.meduim, info.large],
        extraOptions: gredients,
      });
      console.log(order);
    } catch (error) {
      console.log(error);
    }
    setDisplay((prev) => !prev);
  };

  return (
    <>
      <Featured />
      <div className="pizza-container">
        <h1>the best pizza in town</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          DelectusVoluptates?
        </p>
        {isAdmin && (
          <button className="btn" onClick={() => setDisplay((prev) => !prev)}>
            Add pizza
          </button>
        )}
        {display && (
          <div className="back">
            <div className="content">
              <h3 className="h3" onClick={() => setDisplay((prev) => !prev)}>
                x
              </h3>
              <h2>Add a new pizza</h2>
              <div className="file">
                <input type="file" style={{ border: "none" }} />
              </div>
              <div className="content-box">
                <p>title</p>
                <input
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  type="text"
                  placeholder="title"
                  id="title"
                />
              </div>
              <div className="content-box">
                <p>description</p>
                <textarea
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  type="text"
                  placeholder="description"
                  id="desc"
                />
              </div>
              <div className="content-box">
                <p>Prices</p>
                <div className="prices">
                  <input
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    type="text"
                    placeholder="Small"
                    id="small"
                  />
                  <input
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    type="text"
                    placeholder="Meduim"
                    id="meduim"
                  />
                  <input
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    type="text"
                    placeholder="Large"
                    id="large"
                  />
                </div>
              </div>
              <div className="content-box">
                <p>Extra</p>
                <div className="prices">
                  <input
                    type="text"
                    placeholder="gredient"
                    onChange={(e) => setText(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <button className="add" onClick={(e) => add(e)}>
                    Add
                  </button>
                </div>
                <div className="info">
                  {gredients.map((gredient, i) => (
                    <button key={i}>
                      {gredient.text} {gredient.price}
                    </button>
                  ))}
                </div>
              </div>
              <button className="create" onClick={(e) => handleSumbit(e)}>
                create
              </button>
            </div>
          </div>
        )}
        <div className="box-container">
          {product?.map((item, i) => (
            <PizzaCart pizza={item} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PizzaSection;
