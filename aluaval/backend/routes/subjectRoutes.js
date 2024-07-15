import express from "express";
const subjectRouter = express.Router();
import SubjectController from "../controllers/subjectController.js";

subjectRouter.post("/", SubjectController.createSubject);
subjectRouter.get("/", SubjectController.getAllSubjects);
subjectRouter.get("/:id", SubjectController.getSubjectByID);
subjectRouter.put("/:id", SubjectController.updateSubjectByID);
subjectRouter.delete("/:id", SubjectController.deleteSubject);

router.get("/course/:course", SubjectController.getSubjectsByCourse);
router.get("/year/:year", SubjectController.getSubjectsByYear);

export default subjectRouter;
