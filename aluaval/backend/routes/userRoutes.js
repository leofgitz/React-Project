import express from "express";
const userRouter = express.Router();
import UserController from "../controllers/userController";

userRouter.post("/", UserController.createUser);
userRouter.get("/students", UserController.getAllStudents);
userRouter.get("/:id", UserController.getUserByID);
userRouter.put("/:id", UserController.updateUserByID);
userRouter.delete("/:id", UserController.deleteUser);

router.put("/:id/password", UserController.updatePassword);
router.post("/reset-password", UserController.resetPassword);

export default userRouter;
