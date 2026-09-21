const {  mongoose } = require("mongoose");

const paymentschema = new mongoose.Schema({

})
const paymentmodel = mongoose.model('payment', paymentschema)
module.exports = paymentmodel;