const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

async function identifyUser(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Access token is required"
        });
    }

    const isBlacklisted = await blacklistModel.findOne({
        token: token
    });

    if(isBlacklisted){
        return res.status(401).josn({
            message: "Invalid token"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userDets = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid  token"
        });
    }
}

module.exports = {
    identifyUser
}