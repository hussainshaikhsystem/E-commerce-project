const mongoose = require("mongoose");
const productschema = new mongoose.Schema({
   name: {type: String, required: true},
   description: {type: String, required: true},
   price: {type: Number, required: true},
   category: {type: String, required: true},
   stock: {type: Number, required: true},
   imageurl: {type: String, required: true},
   createdAt: {type: Date, default: Date.now},
   rating: {type:Number, default: 0},
   numreviews: {type: Number, default: 0}
});
const productmodel = mongoose.model('Product', productschema) 
module.exports = productmodel