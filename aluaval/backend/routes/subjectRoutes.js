import express from "express";
const subjectRouter = express.Router();
import SubjectController from "../controllers/subjectController.js";

subjectRouter.post("/", SubjectController.createSubject);
subjectRouter.get("/", SubjectController.getAllSubjects);
subjectRouter.get("/:id", SubjectController.getSubjectByID);
subjectRouter.put("/:id", SubjectController.updateSubjectByID);
subjectRouter.delete("/:id", SubjectController.deleteSubject);

export default subjectRouter;
