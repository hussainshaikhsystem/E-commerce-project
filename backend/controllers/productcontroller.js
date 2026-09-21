const productmodel = require("../models/productmodel.js");
const cloudinary = require("../config/cloudinary.js");
const getproducts = async (req, res, next) => {
  try {
    const products = await productmodel.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: "cant fetch products" });
  }
};
const getproductbyid = async (req, res, next) => {
  try {
    const product = await productmodel.findById(req.params.id);
    if (product === null) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "cant fetch product" });
  }
};
const fs = require("fs");
const createproduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let imageurl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "shopnest",
      });
      
      imageurl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const product = await productmodel.create({
      name,
      description,
      price,
      category,
      stock,
      imageurl,
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "cant fetch product" });
  }
};
const updateproduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;

    let updatedata = { name, description, price, category, stock };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "shopnest",
      });
      updatedata.imageurl = result.secure_url;
    }

    const updatedproduct = await productmodel.findByIdAndUpdate(
      req.params.id,
      updatedata,
      { new: true, runValidators: true },
    );

    if (!updatedproduct) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json(updatedproduct);
  } catch (err) {
    res.status(400).json({ message: "cant update product" });
  }
};
const deleteproduct = async (req, res, next) => {
  try {
    const deletedproduct = await productmodel.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedproduct);
  } catch (err) {
    res.status(400).json({ message: "cant delete product" });
  }
};

module.exports = { getproducts, getproductbyid, createproduct, updateproduct , deleteproduct};
