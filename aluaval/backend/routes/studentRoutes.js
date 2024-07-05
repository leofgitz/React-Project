import express from "express";
const studentRouter = express.Router();
import StudentController  from "../controllers/studentController.js";

studentRouter.post("/", StudentController.createStudent);
studentRouter.get("/", StudentController.getAllStudents);
studentRouter.get("/:id", StudentController.getStudentByID);
studentRouter.put("/:id", StudentController.updateStudentByID);
studentRouter.delete("/:id", StudentController.deleteStudent);

export default studentRouter;
