const express = require("express");
const { protect } = require("../middlewares/authmiddleware.js");
const { admin } = require("../middlewares/adminmiddleware.js");
const {
  getproducts,
  createproduct,
  getproductbyid,
  updateproduct,
  deleteproduct
} = require("../controllers/productcontroller.js");
const multer = require("multer"); 
const upload = multer({ dest: "uploads/" }); // Set the destination folder for uploaded files
const router = express.Router();

router.route("/").get(getproducts)
  .post(protect, admin, upload.single("image"),  createproduct);

  router.route("/:id").get(getproductbyid)
  .put(protect, admin, upload.single("image"), updateproduct)
  .delete(protect, admin, deleteproduct);
module.exports = router;
