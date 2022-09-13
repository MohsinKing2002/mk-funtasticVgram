const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async(req, res, next)=>{
    try {

        let {token} = req.cookies;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Please log in !!"
            })
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded._id);

        next();

    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}