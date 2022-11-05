import React from 'react'
import { useNavigate } from "react-router-dom";
import img from '../../img/pizza.png'

const PizzaCart = ({pizza}) => {
  const Navigate  = useNavigate()

  
  return (
    <div className="box" onClick={() => {Navigate(`/pizza/${pizza._id}`)}}>
        <div className="img">
            <img src={img} alt="pizza"/>
        </div>
        <div className="content">
            <p>{pizza.title}</p>
            <p>${pizza.prices[0]}</p>
            <p>{pizza.desc}</p>
        </div>
    </div>
  )
}

export default PizzaCart