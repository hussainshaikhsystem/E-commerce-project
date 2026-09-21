const usermodel = require("../models/usermodel.js");
const ordermodel = require("../models/ordermodel.js");
const productmodel = require("../models/productmodel.js");
const getadminstats = async (req, res) => {
  try {
    const totalusers = await usermodel.countDocuments({ role: "user" });
    const totalorders = await ordermodel.countDocuments({});
    const totalproducts = await productmodel.countDocuments({});
    const orders = await ordermodel.find({});
    const totalrevenuedata = orders.reduce(
      (acc, order) => acc + order.totalamount,
      0,
    );
    res.status(200).json({
      totalorders,
      totalproducts,
      totalusers,
      totalrevenue: totalrevenuedata,
    });
  } catch (err) {
    res.status(400).json({ message: "unable to get stats" });
  }
};
module.exports= {getadminstats}