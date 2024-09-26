import express from "express";
const badgeRouter = express.Router();
import BadgeController from "../controllers/badgeController.js";

badgeRouter.post("/", BadgeController.createBadge);
badgeRouter.get("/", BadgeController.getAllBadges);
badgeRouter.get("/:id", BadgeController.getBadgeByID);
badgeRouter.patch("/:id", BadgeController.updateBadgeByID);
badgeRouter.delete("/:id", BadgeController.deleteBadge);

export default badgeRouter;
