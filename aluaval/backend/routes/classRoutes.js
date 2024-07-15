import express from "express";
const classRouter = express.Router();
import ClassController from "../controllers/classController.js";

classRouter.post("/", ClassController.createClass);
classRouter.get("/", ClassController.getAllClasses);
classRouter.get("/:id", ClassController.getClassByID);
classRouter.put("/:id", ClassController.updateClassByID);
classRouter.delete("/:id", ClassController.deleteClass);

router.get("/subject/:subject", ClassController.getClassesBySubject);
router.get("/teacher/:teacher", ClassController.getClassesByTeacher);

export default classRouter;
