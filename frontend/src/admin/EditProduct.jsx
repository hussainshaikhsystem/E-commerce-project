import React, { useContext, useEffect } from "react";
import "../styles/addproduct.css";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../axiosinstance";
const EditProduct = () => {
  const { user } = useContext(AuthContext);
  const [formdata, setformdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect( () => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    const fetchproduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        const data = res.data;
        setformdata({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
        });
      } catch (err) {
        console.error(err.message);
      } finally {
        setloading(false);
      }
    };
    fetchproduct()
  }, [id, user , navigate]);
  const handlesubmit = async (e) => {
    e.preventDefault();

    setloading(true);
    const formdatas = new FormData();
    formdatas.append("name", formdata.name);
    formdatas.append("description", formdata.description);
    formdatas.append("price", formdata.price);
    formdatas.append("category", formdata.category);
    formdatas.append("stock", formdata.stock);
     if (image) {
      formdatas.append("image", image);
    };

     try {
      await axiosInstance.put(`/products/${id}`, formdatas, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="addproduct-parent">
      <div className="add-product">
        <h1>Edit Product</h1>
        <form onSubmit={handlesubmit} action="">
          <input
            onChange={(e) => {
              setformdata({ ...formdata, name: e.target.value });
            }}
            type="text "
            placeholder="Product Name"
          />
          <textarea
            onChange={(e) => {
              setformdata({ ...formdata, description: e.target.value });
            }}
            name=""
            id=""
            placeholder="Description"
          ></textarea>
          <input
            onChange={(e) => {
              setformdata({ ...formdata, price: e.target.value });
            }}
            type="number"
            placeholder="Price"
          />
          <input
            onChange={(e) => {
              setformdata({ ...formdata, category: e.target.value });
            }}
            type="text"
            placeholder="Category"
          />
          <input
            onChange={(e) => {
              setformdata({ ...formdata, stock: e.target.value });
            }}
            type="number"
            placeholder="Stock Quantity"
          />
          <span>Replace Product Image (Optional)</span>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            className="file"
            type="file"
          />
          <button type="submit"> Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
