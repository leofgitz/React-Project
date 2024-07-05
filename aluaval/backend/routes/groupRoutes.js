import express from "express";
const groupRouter = express.Router();
import GroupController from "../controllers/groupController.js";

groupRouter.post("/", GroupController.createGroup);
groupRouter.get("/", GroupController.getAllGroups);
groupRouter.get("/:id", GroupController.getGroupByID);
groupRouter.put("/:id", GroupController.updateGroupByID);
groupRouter.delete("/:id", GroupController.deleteGroup);

export default groupRouter;
