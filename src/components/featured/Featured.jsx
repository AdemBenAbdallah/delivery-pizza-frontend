import React , {useState} from "react";
import "./featured.css";
import pan from "../../img/Pan-Pizza-Crust.jpg";
import pizza from "../../img/Pizza.jpg";
import pizzaAbout from "../../img/PizzaAbout.jpg";
import arrowl from '../../img/arrowl.png'
import arrowr from '../../img/arrowr.png'

const Featured = () => {
  const [index, setIndex] = useState(0)
  const imgs = [pizza,pan, pizzaAbout];

  const handleIndex = (direction) => {
    if (direction === "l") {
      setIndex(index === 0 ? 2 : index - 1)
    } else if  (direction === "r") {
      setIndex(index === 2 ?  0 : index + 1 )
    }
  }

  return (
    <div className="featured">
      <div className="arrow">
        <img src={arrowl} alt="arrowl" onClick={() => handleIndex("l")}/>
      </div>
      <div className="wrapper" style={{transform : `translateX(${-100 * index}vw)`}}>
      {imgs.map((img , i) => (
        <div className="image" key={i}>
          <img src={img} alt="img" />
        </div>
      ))}
      </div>
      <div className="arrow">
        <img src={arrowr} alt="arrowr" style={{right : 0}} onClick={() => handleIndex("r")} />
      </div>
    </div>
  );
};

export default Featured;
