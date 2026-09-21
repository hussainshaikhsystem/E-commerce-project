import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Productcard from "../components/productcard.jsx";
import axiosInstance from "../../axiosinstance.js";
const Home = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchproducts = async () => {
      try {
       
        const res = await axiosInstance.get('/products');
        setproducts(res.data.slice(0, 4));
      } catch (err) {
        console.log("unable to fetch products");
      } finally {
        setloading(false);
      }
    };
    fetchproducts();
  }, []);
  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to Shopnest</h1>
        <p>
          Your one-stop shop for all your needs, explore our wide range of
          products and services
        </p>
      </div>
     <h2 className="heading">Featured Products</h2>
    {loading ? (
     <div>Loading...</div>
    ) : (
     <div className="product-grid">
      {products.map((product) => (
       <Productcard key={product._id} product={product} />
      ))}
     </div>
    )}

    </div>
  );
};

export default Home;
