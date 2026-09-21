import React, { useContext, useState } from "react";
import "../styles/login.css";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import { Link } from "react-router-dom";
const Register = () => {
  const [step, setstep] = useState(1);
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpasswprd] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const [otp, setotp] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleregister = async (e) => {
    e.preventDefault();
    seterror("");
    if (password.length < 6) {
      seterror("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmpassword) {
      seterror("Passwords do not match");
      return;
    }
    setloading(true);

    try {
      const res = await axiosInstance.post("/auth/register", {
        fullname,
        email,
        password,
      });
      setstep(2);
    } catch (err) {
      seterror(err.response?.data?.message || "Registration failed");
    } finally {
      setloading(false);
    }
  };

  // step 2
  const handleverifyotp = async (e) => {
    e.preventDefault();
    seterror("");
    setloading(true);
    try {
      const res = await axiosInstance.post("/auth/verifyotp", { email, otp });
      login(res.data);
      navigate("/");
    } catch (err) {
      seterror(err.response?.data?.message || "OTP verification failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <div className="parent">
        <div className="login-box">
          {step === 1 ? (
            <>
              <h2>Register</h2>
                {error && <p className="error-text">{error}</p>} 
              <form onSubmit={handleregister} className="inputs">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setpasswprd(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              <div className="acc">
                <h3>Already have an account?</h3>
                <Link to="/login">Login</Link>
              </div>
            </>
          ) : (
            <>
              <h2>Verify OTP</h2>
               {error && <p className="error-text">{error}</p>}
              <form onSubmit={handleverifyotp} className="inputs">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  required
                />
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default Register;
