import express from "express";
const enrollmentRouter = express.Router();
import EnrollmentController from "../controllers/enrollmentController.js";

enrollmentRouter.post("/", EnrollmentController.createEnrollment);
enrollmentRouter.get("/", EnrollmentController.getAllEnrollments);
enrollmentRouter.get("/:id", EnrollmentController.getEnrollmentByID);
enrollmentRouter.patch("/:id", EnrollmentController.updateEnrollmentByID);
enrollmentRouter.delete("/:id", EnrollmentController.deleteEnrollment);

enrollmentRouter.post("/bulk-enroll", EnrollmentController.bulkEnrollStudents);
enrollmentRouter.get("/class/:classe", EnrollmentController.getEnrollmentsByClasse);
enrollmentRouter.get("/student/:student", EnrollmentController.getEnrollmentsByStudent);

export default enrollmentRouter;
