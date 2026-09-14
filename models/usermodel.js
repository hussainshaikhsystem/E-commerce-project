const mongoose = require('mongoose');
 const userschema  = new mongoose.Schema({
    fullname: String,
    email: {type: String , unique: true},
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    }
})
module.exports  =  mongoose.model('User',userschema)