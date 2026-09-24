import React, { useContext, useState } from "react";
import "../styles/ship.css";
import { AuthContext } from "../context/authcontext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinstance";
import { clearcart } from "../redux/cartslice";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartitems = useSelector((state) => state.cart.cartitems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setaddress] = useState({
    fullname: "",
    street: "",
    city: "",
    postalcode: "",
    country: "",
  });

  const totalprice = cartitems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // Saves the order after successful (or bypassed) payment
  const saveorder = async (paymentid) => {
    try {
       const orderItems = cartitems.map((item) => ({
      productid: item._id,
      qty: item.qty,
      price: item.price,
    }));

    await axiosInstance.post("/orders", {
      items: orderItems,
      totalamount: totalprice,
      address,
      paymentid,
    });
    dispatch(clearcart());
    navigate("/ordersuccess");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Order saving failed");
    }
  };

  // Student bypass: skip Razorpay entirely, save order directly
  const bypasspayment = () => {
    saveorder("bypass_txn_" + Date.now());
  };

  // Shared prompt shown whenever Razorpay can't be used
  const askbypass = (message) => {
    const usebypass = window.confirm(message);
    if (usebypass) {
      bypasspayment();
    } else {
      alert("Payment cancelled");
    }
  };

  const handlepayment = async () => {
    try {
      const orderes = await axiosInstance.post("/payment/order", {
        amount: totalprice,
      });
      const orderdata = orderes.data;

      const options = {
        key: orderdata.key || "rzp_test_dummykey123",
        amount: orderdata.amount,
        currency: orderdata.currency,
        name: "Shopnest",
        description: "Test Transaction",
        order_id: orderdata.id,
        handler: async function (response) {
          try {
            await axiosInstance.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            saveorder(response.razorpay_payment_id);
          } catch (err) {
            askbypass(
              "Payment verification failed. Use Student Bypass Mode to place test order?",
            );
          }
        },
        prefill: {
          name: address.fullname,
          email: user?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzpl = new window.Razorpay(options);
      rzpl.open();
    } catch (err) {
      // order creation itself failed (e.g. Razorpay keys unconfigured on backend)
      askbypass(
        "Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?",
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    handlepayment();
  };

  return (
    <form onSubmit={handleSubmit} className="shipping-parent">
      <h1>Checkout</h1>
      <div className="shipping-box">
        <h2>Shipping Address</h2>
        <div className="inputs">
          <input
            type="text"
            placeholder="Full Name"
            value={address.fullname}
            onChange={(e) =>
              setaddress({ ...address, fullname: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setaddress({ ...address, street: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setaddress({ ...address, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={address.postalcode}
            onChange={(e) =>
              setaddress({ ...address, postalcode: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(e) =>
              setaddress({ ...address, country: e.target.value })
            }
            required
          />
        </div>
        <div className="payment-box">
          <h2>Total to Pay: ₹{totalprice.toFixed(2)}</h2>
          <button type="submit">Pay Now</button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;