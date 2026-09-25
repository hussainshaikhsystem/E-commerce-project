import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { AuthContext } from "../context/authcontext";
import {useSelector} from 'react-redux'
const Navbar = () => {
  const {user , logout} = useContext(AuthContext);
  const cartitems = useSelector((state) => state.cart.cartitems );
  const navigate = useNavigate();
  const handlelogout = () => {
    logout();
    navigate('/login')
  }
  return (
  <div className="navbar">
    <div className="navbar-brand">
      <Link to="/">
        <img src="/ShopNestLogo.png" className="navbar-logo" alt="" />
        ShopNest
      </Link>
    </div>
    <ul className="navbar-links">
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/cart">Cart ({cartitems.length})</Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/profile">hi , {user.name}</Link>
          </li>
          {user.role === "admin" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li>
            <button onClick={handlelogout} className="btn-logout">
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </ul>
  </div>
);
}
export default Navbar;
