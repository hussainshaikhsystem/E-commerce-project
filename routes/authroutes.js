const express = require("express");
const router = express.Router();
const {
  registeruser,
  loginuser,
  getusers,
} = require("../controllers/authcontroller.js");

router.post("/register", registeruser);
router.post("/login", loginuser);

router.get("/user", protect, admin, getusers);
module.exports = router;
