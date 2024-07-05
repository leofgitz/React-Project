import express from "express";
const studentGroupRouter = express.Router();
import StudentGroupController from "../controllers/studentGroupController.js";

studentGroupRouter.post("/", StudentGroupController.createStudentGroup);
studentGroupRouter.get("/", StudentGroupController.getAllStudentGroups);
studentGroupRouter.get("/:id", StudentGroupController.getStudentGroupByID);
studentGroupRouter.put("/:id", StudentGroupController.updateStudentGroupByID);
studentGroupRouter.delete("/:id", StudentGroupController.deleteStudentGroup);

export default studentGroupRouter;
