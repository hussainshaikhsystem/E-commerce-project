import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import "../styles/adminproducts.css";
const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setloading(true);
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchorders();
  }, [user]);
  const fetchorders = async () => {
    try {
      const res = await axiosInstance.get("/orders");
      const data = res.data;
      setorders(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setloading(false);
    }
  };
 const handlestatuschange = async (orderid , newstatus) => {
   try{
     await axiosInstance.put(`/orders/${orderid}/status`, {status: newstatus});
      setorders((prev) =>
        prev.map((order) =>
          order._id === orderid ? { ...order, status: newstatus } : order
        )
      );
   }catch(err){
    console.error(err.message)
   }
 }
  return (
    <div className="manageproduct-parent">
      <div className="manage-box">
        <div className="mp-top">
          <h1>Manage Orders</h1>
        </div>
        <div className="mp-header orders-grid">
          <h3>Order ID</h3>
          <h3>User</h3>
          <h3>Total</h3>
          <h3>Date</h3>
          <h3>Status</h3>
        </div>
        <div className="mps">
          {orders.map((order) => (
            <div className="mp-row mp-order" key={order._id || order.id}>
              <h3 className="id">{order._id}</h3>
              <h3>{order.user.fullname ||  'N/A'}</h3>
              <h3>₹{order.totalamount}</h3>
              <h3>{new Date(order.createdAt).toLocaleDateString()}</h3>
              <select className="select" value={order.status} onChange={(e) => {
                handlestatuschange(order._id, e.target.value)
              }} name="" id="">
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
