import express from "express";
const teacherRouter = express.Router();
import TeacherController from "../controllers/teacherController.js";

teacherRouter.post("/", TeacherController.createTeacher);
teacherRouter.get("/", TeacherController.getAllTeachers);
teacherRouter.get("/:id", TeacherController.getTeacherByID);
teacherRouter.put("/:id", TeacherController.updateTeacherByID);
teacherRouter.delete("/:id", TeacherController.deleteTeacher);

export default teacherRouter;
