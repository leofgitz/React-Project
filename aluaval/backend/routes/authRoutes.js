import express from "express";
const authRouter = express.Router();
import AuthController from "../controllers/authController.js";
import UserController from "../controllers/userController.js";

authRouter.post("/login", AuthController.login);
authRouter.post("", UserController.createUser);

export default authRouter;
