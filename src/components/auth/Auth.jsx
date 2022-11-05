import React, { useState } from "react";
import { adminLogin } from "../../store/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Auth = () => {
  const [auth, setAuth] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = (name, value) => {
    setAuth({ ...auth, [name]: value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/login", {
        username: auth.username,
        password: auth.password,
      });
      dispatch(adminLogin());
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth">
      <div className="box">
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => handleAuth(e.target.name, e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => handleAuth(e.target.name, e.target.value)}
        />
        <button onClick={(e) => handleSumbit(e)}>login in</button>
      </div>
    </div>
  );
};

export default Auth;
