import React, { useEffect } from "react";
import axiosInstance from "../../axiosinstance";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext.jsx";
import { useNavigate } from "react-router-dom";
import '../styles/admindashboard.css'
const AdminDashboard = () => {
  const [stats, setstats] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    const fetchstats = async () => {
      try {
        const res = await axiosInstance.get("/analytics");
        const data = await res.data;
        setstats(data);
      } catch (err) {
        console.error(err.message);
        navigate("/login");
      }
    };
    fetchstats();
  }, [user, navigate]);
  return (
    <div className="admin-parent">
      <div className="header">
        <div className="preview">
          <img src="ShopNestLogo.png" alt="" />
          <h1>Admin Dashboard</h1>
        </div>
        <p>
         <span>Welcome Back ,</span> Admin User
        </p>
         </div>
        <div className="matrices">
          <div className="matrix">
            <h3>Total Orders</h3>
            <h1>{stats.totalorders}</h1>
          </div>
          <div className="matrix">
            <h3>Total Products</h3>
            <h1>{stats.totalproducts}</h1>
          </div>
          <div className="matrix">
            <h3>Total Users</h3>
            <h1>{stats.totalusers}</h1>
          </div>
          <div className="matrix">
            <h3>Total Revenue</h3>
            <h1>{stats.totalrevenue}</h1>
          </div>
        </div>
     
      <div className="controls">
        <h1>Administrative controls</h1>
        <div className="btns">
        <button onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
        <button onClick={() => navigate('/admin/products')}>
          <span>
            <img
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4e6.svg"
              alt="Products"
            />
          </span>
          Manage Products
        </button>
        <button onClick={() => navigate('/admin/orders')}>
          <span>
            <img
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f69a.svg"
              alt="Orders"
            />
          </span>
          Manage Orders
        </button>
        <button onClick={() => navigate('/admin/users')}>
          <span>
            <img
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f465.svg"
              alt="Users"
            />
          </span>
          Users Directory
        </button>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
