import express from "express";
const courseRouter = express.Router();
import CourseController from "../controllers/courseController.js";

courseRouter.post("/", CourseController.createCourse);
courseRouter.get("/", CourseController.getAllCourses);
courseRouter.get("/:id", CourseController.getCourseByID);
courseRouter.patch("/:id", CourseController.updateCourseByID);
courseRouter.delete("/:id", CourseController.deleteCourse);

courseRouter.get("/:id/responsible-teacher", CourseController.getResponsibleTeacher);
courseRouter.get("/teacher/:teacher", CourseController.getCoursesByTeacher);

export default courseRouter;
