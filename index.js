const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const userroutes = require('./routes/authroutes.js')
dotenv.config();
connectdb();
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send(" shopnest backend is working");
});
app.use('api/auth',   userroutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
