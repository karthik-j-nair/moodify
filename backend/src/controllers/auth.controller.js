const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");



async function registerController(req, res) {
    const { username, email, password } = req.body;

    const isUserRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserRegistered) {
        return res.status(409).json({
            message: "Invalid credentials"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET, { expiresIn: "3d" }
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered succesfully",
        user: {
            username: user.username,
            email: user.email
        }
    });
}


async function loginController(req, res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    }).select("+password");

    if(!user) {
        return res.status(404).json({
            message: "Invalid Credentials"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Invalid Credientials"
        });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET, { expiresIn: "3d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User login succesfully",
        user: {
            username: user.username,
            email: user.email
        }
    });
}


async function getMeController(req, res) {
    const id = req.userDets.id;

    const user = await userModel.findById(id);

    if(!user) {
        return res.status(400).json({
            message: "User does't exist"
        });
    }

    res.status(200).json({
        message: "User details fetched successfully",
        user
    });
}


async function logoutUserController(req, res) {
    const token = req.cookies.token;

    res.clearCookie("token");

    await blacklistModel.create({
        token
    });

    res.status(200).json({
        message: "Logout successfull"
    });
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutUserController
}