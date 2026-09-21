import React from "react";
import Productcard from "../components/productcard.jsx";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosinstance.js";
import "../styles/shop.css";
const Shop = () => {
  const [products, setproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setproducts(res.data);
      } catch (err) {
        console.log("unable to fetch products");
      } finally {
        setloading(false);
      }
    };
    fetchproducts();
  }, []);
  let filteredproducts = products.filter((product) => product.name.toLowerCase().includes(search.toLocaleLowerCase()));
  return (
    <div className="shop-parent">
      <h1>All Products</h1>
      <input
        value={search}
        onChange={(e) => {
          setsearch(e.target.value);
        }}
        type="search"
        placeholder="Search Products"
      />
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredproducts.map((product) => (
            <Productcard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
