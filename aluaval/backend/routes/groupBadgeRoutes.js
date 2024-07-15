import express from "express";
const groupBadgeRouter = express.Router();
import GroupBadgeController from "../controllers/groupBadgeController.js";

groupBadgeRouter.post("/", GroupBadgeController.createGroupBadge);
groupBadgeRouter.get("/", GroupBadgeController.getAllGroupBadges);
groupBadgeRouter.get("/:id", GroupBadgeController.getGroupBadgeByID);
groupBadgeRouter.put("/:id", GroupBadgeController.updateGroupBadgeByID);
groupBadgeRouter.delete("/:id", GroupBadgeController.deleteGroupBadge);

router.get("/student/:student", GroupBadgeController.getBadgesByStudent);
router.get("/group/:group", GroupBadgeController.getBadgesByGroup);

export default groupBadgeRouter;
