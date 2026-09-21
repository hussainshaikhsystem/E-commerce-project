import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authcontext";
import "../styles/login.css";
import axiosInstance from "../../axiosinstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
 

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    seterror("");
    setloading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      seterror(err.response?.data?.message || "Login failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="parent">
      <div className="login-box">
        {error && <p className="error-text">{error}</p>}
        <h2>Login</h2>
        <form onSubmit={handlelogin} className="inputs">
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            name="password"
          />
        
          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <div className="acc">
          <h3>Dont have an account ?</h3>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
