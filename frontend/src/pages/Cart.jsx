import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cartitem from "../pages/Cartitem.jsx";
import "../styles/cart.css";
const Cart = () => {
  const cartitems = useSelector((state) => state.cart.cartitems);
  const navigate = useNavigate();
  return (
   <div className="cart-parent">
  <h1>Shopping Cart</h1>
  <div className="upper-grid">
    <div className="cart-grid">
      {cartitems.map((item) => (
        <Cartitem key={item._id} cartproduct={item} />
      ))}
    </div>
    <div className="total-box">
      <h2>Total: ₹{cartitems.reduce((acc, curr) => acc + curr.price * curr.qty, 0).toFixed(2)}</h2>
      <hr />
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  </div>
</div>
  );
};

export default Cart;
