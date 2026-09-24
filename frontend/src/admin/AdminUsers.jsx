import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import "../styles/adminproducts.css";
const AdminUsers = () => {
  const {user} = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [users, setusers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    if(!user || user.role !== 'admin'){
        navigate('/');
        return
    }fetchusers()
  }, [user]);

  const fetchusers  = async () => {
      const res = await axiosInstance.get('/auth/user');
      const data = res.data;
      setusers(data)
  }
  return (
    <div className="manageproduct-parent">
      <div className="manage-box users-table">
        <div className="mp-top">
          <h1>Users Directory</h1>
        </div>
        <div className="mp-header users-grid">
          <h3>ID</h3>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Role</h3>
          <h3>Joined</h3>
        </div>
        <div className="mps">
          {users.map((user) => (
            <div className="mp-row users-grid" key={user._id || user.id}>
              <h3 className="id">{user._id}</h3>
              <h3>{user.fullname || "N/A"}</h3>
              <h3>{user.email}</h3>
              <h3 className={`role ${user.role === "admin" ? "role-admin" : "role-user"}`}>{user.role}</h3>
              <h3>{new Date(user.createdAt).toLocaleDateString()}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
