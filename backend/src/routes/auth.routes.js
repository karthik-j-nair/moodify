const {Router} = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router();

/**
 * 
 * @routes POST /api/auth/register
 * @desc Register a user
 * @access Public
 */
authRouter.post("/register", authController.registerController);

/**
 * 
 * @routes POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginController);

/** * 
 * @routes GET /api/auth/get-me
 * @desc Get user details
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.identifyUser, authController.getMeController);

/** * 
 * @routes POST /api/auth/logout
 * @desc Logout a user
 * @access Private
 */
authRouter.get("/logout", authController.logoutUserController);

module.exports = authRouter;