import express from "express";
const courseRouter = express.Router();
import CourseController from "../controllers/courseController.js";

courseRouter.post("/", CourseController.createCourse);
courseRouter.get("/", CourseController.getAllCourses);
courseRouter.get("/:id", CourseController.getCourseByID);
courseRouter.put("/:id", CourseController.updateCourseByID);
courseRouter.delete("/:id", CourseController.deleteCourse);

router.get("/:id/responsible-teacher", CourseController.getResponsibleTeacher);
router.get("/teacher/:teacher", CourseController.getCoursesByTeacher);

export default courseRouter;
