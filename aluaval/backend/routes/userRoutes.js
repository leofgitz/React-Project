import express from "express";
const userRouter = express.Router();
import UserController from "../controllers/userController.js";

userRouter.post("/", UserController.createUser);
userRouter.get("/students", UserController.getAllStudents);
userRouter.get("/:id", UserController.getUserByID);
userRouter.patch("/:id", UserController.updateUserByID);
userRouter.delete("/:id", UserController.deleteUser);

userRouter.patch("/:id/password", UserController.updatePassword);
userRouter.get("/:assignment", UserController.getStudentsInGroup);
/* userRouter.post("/reset-password", UserController.resetPassword); */

export default userRouter;
