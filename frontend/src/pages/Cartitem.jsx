import React from "react";
import "../styles/cart.css";
import { useDispatch } from "react-redux";
import { clearcart, increaseqty } from "../redux/cartslice.js";
import { decreaseqty } from "../redux/cartslice.js";
const Cartitem = ({ cartproduct }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="cart-box">
        <img src={cartproduct.imageurl} alt="" />
        <div className="info">
          <h2>{cartproduct.name}</h2>
          <h3>₹{cartproduct.price}</h3>
          <div className="btns">
            <button
              onClick={() => {
                dispatch(decreaseqty(cartproduct._id));
              }}
            >
              -
            </button>
            <p>{cartproduct.qty}</p>
            <button
              onClick={() => {
                dispatch(increaseqty(cartproduct._id));
              }}
            >
              +
            </button>
          </div>
          <button onClick={() => {
            dispatch(clearcart(cartproduct._id))
          }}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
