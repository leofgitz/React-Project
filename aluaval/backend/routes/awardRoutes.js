import express from "express";
const awardRouter = express.Router();
import AwardController from "../controllers/awardController.js";

awardRouter.post("/", AwardController.createAward);
awardRouter.get("/", AwardController.getAllAwards);
awardRouter.get("/:id", AwardController.getAwardByID);
awardRouter.put("/:id", AwardController.updateAwardByID);
awardRouter.delete("/:id", AwardController.deleteAward);

awardRouter.get("/student/:giver", AwardController.getBadgesByStudent);
awardRouter.get("/group/:group", AwardController.getBadgesByGroup);

export default awardRouter;
