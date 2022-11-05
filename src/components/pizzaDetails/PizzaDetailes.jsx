import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import pizza from "../../img/pizza.png";
import size from "../../img/size.png";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/productSlice";
import { increment } from "../../store/couterSlice";
import "./pizzaDetailes.css";

const PizzaDetailes = () => {
  const [numberPizza, setNumberPizza] = useState(1);
  const [product, setProduct] = useState([]);
  const [large, setLarge] = useState(0);
  const [gredients, setGredients] = useState({ number: [0], text: [] });
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      setProduct(data);
    };
    fetchData(`http://localhost:8800/api/product/${id}`);
  }, [id]);

  const order = useSelector((state) => state.order.product);

  const handleDispath = (item, product) => {
    dispatch(
      getOrders([
        ...order,
        {
          img: "../../img/pizza.png",
          name: product[0].title,
          extraOptions: [...gredients.text],
          price:
            item.prices[large] + gredients?.number?.reduce((a, b) => a + b),
          quantity: numberPizza,
          total:
            (item.prices[large] + gredients?.number?.reduce((a, b) => a + b)) *
            numberPizza,
        },
      ])
    );
    dispatch(increment());
  };

 
  return (
    <section>
      <div className="image">
        <img src={pizza} alt="pizza" />
      </div>
      {product?.map((item) => (
        <div className="desc" key={item._id}>
          <p>{item.tittle}</p>
          <p className="price">
            $
            {(item.prices[large] + gredients?.number?.reduce((a, b) => a + b)) *
              numberPizza}
          </p>
          <p className="desc-pizza">{item.desc}</p>
          <p className="title-pizza">Choose the size</p>
          <div className="size">
            <div className="pizza-size" onClick={() => setLarge(0)}>
              <img src={size} alt="pizza" width="30px" />
              <p>small</p>
            </div>
            <div className="pizza-size" onClick={() => setLarge(1)}>
              <img src={size} alt="pizza" width="40px" />
              <p>meduim</p>
            </div>
            <div className="pizza-size" onClick={() => setLarge(2)}>
              <img src={size} alt="pizza" width="50px" />
              <p>large</p>
            </div>
          </div>
          <p className="ingredient">Choose additional ingredients</p>
          <div className="ing">
            {item.extraOptions.map((gredient) => (
              <div className="box" key={gredient._id}>
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.target.checked
                      ? setGredients({
                          number: [...gredients.number, gredient.price],
                          text: [...gredients.text, gredient.text],
                        })
                      : setGredients({
                          number: [gredients.number.pop()],
                          text: [gredients.text.pop()],
                        });
                  }}
                />
                <span>{gredient.text}</span>
              </div>
            ))}
          </div>
          <div className="add_cart">
            <input
              type="number"
              value={numberPizza}
              onChange={(e) => setNumberPizza(e.target.value)}
              min="0"
            />
            <button onClick={() => handleDispath(item, product)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PizzaDetailes;
