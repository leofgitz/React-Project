import express from "express";
const userRouter = express.Router();
import UserController from "../controllers/userController";
import { User } from "../models";

userRouter.post("/", UserController.createUser);
userRouter.get("/students", UserController.getAllStudents);
userRouter.get("/:id", UserController.getUserByID);
userRouter.put("/:id", UserController.updateUserByID);
userRouter.delete("/:id", UserController.deleteUser);

userRouter.put("/:id/password", UserController.updatePassword);
userRouter.get("/:assignment", UserController.getStudentsInGroup);
userRouter.post("/reset-password", UserController.resetPassword);

export default userRouter;
