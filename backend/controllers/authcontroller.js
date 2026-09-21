const usermodel = require("../models/usermodel.js");
const sendemail = require("../utils/sendmail.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generatetoken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" });
};
const registeruser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const pass = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpexpiry = new Date(Date.now() + 10 * 60 * 1000);
    const newuser = await usermodel.create({
      fullname,
      email,
      password: pass,
      otp,
      otpexpiry,
    });
    if (newuser) {
      const message = `Welcome to SHopnest , ${fullname} , We are excited to have you as part of our community . to completed your registraion please use the following otp your otp for shopnest registarion us ${otp}`;
      await sendemail(
        email,
        "Welcome to shopnest = your otp for registration",
        message,
      );
      res.status(200).json({
        _id: newuser._id,
        message: "otp sent to email , please verify",
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (err) {
    console.error(err.message);
  }
};
const verifyotp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found with this email" });
    }
    if (user.verified) {
      return res.status(400).json({ message: "user already verified" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "invalid otp" });
    }
    if (user.otpexpiry < new Date()) {
      return res.status(400).json({ message: "otp expired" });
    }
    user.verified = true;
    user.otp = undefined;
    user.otpexpiry = undefined;
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.fullname,
      email: user.email,
      role: user.role,
      token: await generatetoken(user._id),
    });
  } catch (err) {
    res.status(400).json({ message: "unable to verify otp" });
  }
};
// login user
const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "no user found with this email" });
    }
     if (!user.verified) {
      return res.status(403).json({ message: "please verify your email first" });
    }
    const rightpass = await bcrypt.compare(password, user.password);
    if (rightpass) {
      res.json({
        _id: user._id,
        name: user.fullname,
        email: user.email,
        role: user.role,
        token: await generatetoken(user._id),
      });
    } else {
      res.status(400).json({ message: "wrong password" });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const getusers = async (req, res) => {
  try {
    const users = await usermodel.find({}).select("-password");
    res.json(users);
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = { registeruser, loginuser, getusers , verifyotp};
