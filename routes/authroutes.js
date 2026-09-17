const express = require("express");
const router = express.Router();
const {
  registeruser,
  loginuser,
  getusers,
  verifyotp
} = require("../controllers/authcontroller.js");
const { protect } = require("../middlewares/authmiddleware.js");
const { admin } = require("../middlewares/adminmiddleware.js");
router.post("/register", registeruser);
router.post("/login", loginuser);
router.post('/verifyotp', verifyotp)
router.get("/user", protect, admin, getusers);
module.exports = router;
