import express from "express";
const groupRouter = express.Router();
import GroupController from "../controllers/groupController.js";

groupRouter.post("/", GroupController.createGroup);
groupRouter.get("/", GroupController.getAllGroups);
groupRouter.get("/:id", GroupController.getGroupByID);
groupRouter.patch("/:id", GroupController.updateGroupByID);
groupRouter.patch("/:id/submission-date", GroupController.updateSubmissionDate);
groupRouter.delete("/:id", GroupController.deleteGroup);

router.get("/subject/:subject", GroupController.getGroupsBySubject);
router.get("/assignment/:assignment", GroupController.getGroupsByAssignment);

export default groupRouter;
