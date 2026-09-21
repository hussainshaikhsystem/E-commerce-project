const express = require("express");
const { protect } = require("../middlewares/authmiddleware.js");
const { admin } = require("../middlewares/adminmiddleware.js");
const {
  getadminstats,

} = require("../controllers/analyticscontroller.js");

const router = express.Router();
router.post("/", protect, admin, getadminstats);

module.exports = router;
