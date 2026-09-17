const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel.js');

const protect = async (req, res , next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = await usermodel.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            console.error(err.message);
            res.status(401).json({message: 'not authorized'})
        }
        if(!token){
            res.status(401).json({message: 'not authorized , no token'})
        }
}
}
module.exports = {protect};