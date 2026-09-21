const usermodel = require("../models/usermodel.js");
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(404).json({ message: "access denied, admin only" });
  }
};
module.exports = { admin };