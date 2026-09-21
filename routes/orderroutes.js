const express = require("express");
const { protect } = require("../middlewares/authmiddleware.js");
const { admin } = require("../middlewares/adminmiddleware.js");
const {
  createorder,
  getallorders,
  getmyorders,
  updateorderstatus,
} = require("../controllers/ordercontroller.js");
const router = express.Router();

router.route("/").post(protect, createorder).get(protect, admin, getallorders);
router.route("/myorders").get(protect, getmyorders);
router.route("/:id/status").put(protect, admin, updateorderstatus);

module.exports = router;