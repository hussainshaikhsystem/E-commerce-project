const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const userroutes = require('./routes/authroutes.js')
const productroutes = require('./routes/productroutes.js')
const orderroutes = require('./routes/orderroutes.js')
const paymentroutes = require('./routes/paymentroutes.js')
const analyticsroutes = require('./routes/analyticsroutes.js');
const path = require("path")
dotenv.config();
connectdb();
const app = express();
app.use(cors(
  {
    origin:process.env.FRONTEND_URL ||  'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));
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

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
  });
}else {
  app.get('/', (req, res) => {
    res.send('Shopnest API is running in development mode')
  })
}
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
