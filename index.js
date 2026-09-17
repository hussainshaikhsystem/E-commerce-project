const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const userroutes = require('./routes/authroutes.js')
const productroutes = require('./routes/productroutes.js')
const orderroutes = require('./routes/orderroutes.js')
const paymentroutes = require('./routes/paymentroutes.js')
const analyticsroutes = require('./routes/analyticsroutes.js')
dotenv.config();
connectdb();
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send(" shopnest backend is working");
});
app.use('/api/auth',   userroutes);
app.use('/api/products',   productroutes);
app.use('/api/orders',   orderroutes);
app.use('/api/payment',   paymentroutes);
app.use('/api/analytics',   analyticsroutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
