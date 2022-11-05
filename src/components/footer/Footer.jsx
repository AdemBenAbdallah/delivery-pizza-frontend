import React from "react";
import footer from "../../img/bg.png";
import "./footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="img">
        <img src={footer} alt="footer" />
      </div>
      <div className="box">
        <div className="content" style={{ flex: 1 }}>
          <p className="title">
            oh yes, we did.the adem pizza, well baked slice of pizza.
          </p>
        </div>
        <div className="content" style={{ flex: 2 , display: "flex" , gap : 10 }}>
          <div className="c-box">
            <h3>find our restaurants</h3>
            <div className="address">
              <p>1243,R Don Road #345</p>
              <p>Moknine, 5050</p>
              <p>(+216) 23 919 861</p>
            </div>
            <div className="address">
              <p>1243,R Don Road #345</p>
              <p>Moknine, 5050</p>
              <p>(+216) 23 919 861</p>
            </div>
            <div className="address">
              <p>1243,R Don Road #345</p>
              <p>Moknine, 5050</p>
              <p>(+216) 23 919 861</p>
            </div>
          </div>
          <div className="c-box">
            <h3>working hours</h3>
            <div className="date">
              <p>monday until friday</p>
              <p>9:00 - 22:00</p>
            </div>
            <div className="date">
              <p>sturday until sanday</p>
              <p>10:00 - 00:00</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
