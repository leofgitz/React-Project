import express from "express";
const enrollmentRouter = express.Router();
import EnrollmentController from "../controllers/enrollmentController.js";

enrollmentRouter.post("/", EnrollmentController.createEnrollment);
enrollmentRouter.get("/", EnrollmentController.getAllEnrollments);
enrollmentRouter.get("/:id", EnrollmentController.getEnrollmentByID);
enrollmentRouter.put("/:id", EnrollmentController.updateEnrollmentByID);
enrollmentRouter.delete("/:id", EnrollmentController.deleteEnrollment);

export default enrollmentRouter;
