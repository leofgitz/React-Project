import express from "express";
const assignmentRouter = express.Router();
import AssignmentController from "../controllers/assignmentController.js";

assignmentRouter.post("/", AssignmentController.createAssignment);
assignmentRouter.get("/", AssignmentController.getAllAssignments);
assignmentRouter.get("/:id", AssignmentController.getAssignmentByID);
assignmentRouter.put("/:id", AssignmentController.updateAssignmentByID);
assignmentRouter.delete("/:id", AssignmentController.deleteAssignment);

export default assignmentRouter;
