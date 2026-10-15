import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cartitem from "../pages/Cartitem.jsx";
import { clearcart } from "../redux/cartslice.js";
import "../styles/cart.css";
const Cart = () => {
  const cartitems = useSelector((state) => state.cart.cartitems);
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true);
  const handlecart = () => {
    setloading(cartitems.length === 0);
  };
  useEffect(() => {
    handlecart();
  }, [cartitems]);

  const navigate = useNavigate();
  return (
    <div className="cart-parent">
      <h1>Shopping Cart</h1>
      {loading ? (
        <div>There is no items in Cart</div>
      ) : (
        <div className="upper-grid">
          <div className="cart-grid">
            {cartitems.map((item) => (
              <Cartitem key={item._id} cartproduct={item} />
            ))}
          </div>
          <div className="total-box">
            <h2>
              Total: ₹
              {cartitems
                .reduce((acc, curr) => acc + curr.price * curr.qty, 0)
                .toFixed(2)}
            </h2>
            <hr />
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => dispatch(clearcart())}
              className="checkout-btn"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
