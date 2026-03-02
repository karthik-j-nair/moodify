const jwt = require("jsonwebtoken");
const redis = require("../config/cache")

async function identifyUser(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Access token is required"
        });
    }

    const isBlacklisted = await redis.get(token);

    if(isBlacklisted){
        return res.status(401).json({
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