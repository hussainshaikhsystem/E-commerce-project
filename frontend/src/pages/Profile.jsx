import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import axiosInstance from "../../axiosinstance";
const Profile = () => {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchmyorders = async () => {
      try {
        const res = await axiosInstance.get("/orders/myorders");
        const data = res.data;
        setorders(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setloading(false);
      }
    };
    fetchmyorders();
  }, [user, navigate]);
  const handlelogout = () => {
    navigate("/logout");
  };
  if (!user) return <p>Loading...</p>;
  return (
    <div className="profile-parent">
      <div className="profile-box">
        <div className="content">
          <h1>My Profile</h1>
          <h2>Name: {user.name}</h2>
          <h2>Email: {user.email}</h2>
          <p className="p">Account Type: {user.role}</p>
        </div>

        <button className="logout-btn" onClick={handlelogout}>
          Logout
        </button>
      </div>
      <div className="order-history">
        <h2>Order History</h2>
        <div className="order-box">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div className="order-item" key={order._id || order.id}>
                <div className="order-details">
                  <p>
                    Order ID: <span>{order._id || order.id}</span>
                  </p>
                  <p>
                    Placed On:{" "}
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="total">
                    Total: <span>₹{order.totalamount}</span>
                  </p>
                </div>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
