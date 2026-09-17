const ordermodel = require("../models/ordermodel.js");
const sendemail = require("../utils/sendmail.js");

const createorder = async (req, res) => {
  try {
    const { items, totalamount, address, paymentid } = req.body;
    if (!items || !totalamount || !address || !paymentid) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    } else {
      const order = await ordermodel.create({
        items,
        totalamount,
        address,
        paymentid,
        user: req.user._id,
      });
      const message = `Dear ${req.user.fullname}, \n \n Thank you for order ! Your order has been placed \n Order ID: ${order._id} \n Total Amount: ${order.totalamount} \n Payment ID: ${order.paymentid} \n \n Regards, \n Shopnest Team Shipping Address: \n ${order.address.street} \n ${order.address.city} \n ${order.address.postalcode}`;
      await sendemail(req.user.email, "Order created", message);
      res.status(201).json({ message: "Order created successfully", order });
    }
  } catch (err) {
    res.status(400).json({ message: "unable to create order" });
  }
};
const getmyorders = async (req, res) => {
  try {
    const orders = await ordermodel
      .find({ user: req.user._id })
      .populate("items.productid", "name price");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", err });
  }
};
const getallorders = async (req, res) => {
  try {
    const orders = await ordermodel.find({}).populate("user", "fullname email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", err });
  }
};
const updateorderstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await ordermodel.findById(req.params.id);
    if (order) {
      order.status = status;
      await order.save();
      res.json({ message: "order status updated", order });
    } else {
      res.status(404).json({ message: "order not found" });
    }
  } catch (err) {
    res.status(404).json({ message: "unable to update order" });
  }
};
module.exports = { createorder, getmyorders, getallorders, updateorderstatus };
