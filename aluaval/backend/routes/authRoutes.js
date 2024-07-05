import express from "express";
const authRouter = express.Router();
import AuthController from "../controllers/authController.js";

authRouter.post("/login", AuthController.login);

export default authRouter;
