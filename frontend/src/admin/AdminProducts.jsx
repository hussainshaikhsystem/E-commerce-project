import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import { AuthContext } from "../context/authcontext";
import '../styles/adminproducts.css'
import axios from "axios";
const AdminProducts = () => {
  const [loading, setloading] = useState(false);
  const [products, setproducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchproducts();
  }, [user, navigate]);
  const handledelete = async (id) => {
    if (window.confirm("Are u strictly sure you want to delete this product?")) {
      await axiosInstance.delete(`/products/${id}`);
      setproducts((currentProducts) =>
        currentProducts.filter((product) => product._id !== id)
      );
    }
  };
  const fetchproducts = async () => {
    setloading(true);
    try {
      const res = await axiosInstance.get("/products");
      const data = res.data;
      setproducts(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="manageproduct-parent">
      <div className="manage-box">
        <div className="mp-top">
        <h1>Manage Products</h1>
        <button
          onClick={() => {
            navigate("/admin/add-product");
          }}
        >
          + Add Product
        </button>
      
      </div>
      <div className="mp-header">
        <h3>iD</h3>
        <h3>Name</h3>
        <h3>Price</h3>
        <h3>Category</h3>
        <h3>stock</h3>
        <h3>Actions</h3>
      </div>
      <div className="mps">
        {products.map((product) => (
          <div className="mp-row" key={product._id || product.id}>
            <h3 className="id">{product._id || product.id}</h3>
            <h3>{product.name}</h3>
            <h3>{product.price}</h3>
            <h3>{product.category}</h3>
            <h3>{product.stock}</h3>
            <div className="actions">
              <button onClick={() => navigate(`/admin/edit-product/${product._id}`)} type="button">Edit</button>
              <button onClick={() => {
                handledelete(product._id)
              }} type="button">Delete</button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default AdminProducts;
