const express = require("express");
const {
  createorder,
  verifypayment,
} = require("../controllers/paymentcontroller.js");
const router = express.Router();

router.post("/order", createorder);
router.post("/verify", verifypayment);

module.exports = router;
