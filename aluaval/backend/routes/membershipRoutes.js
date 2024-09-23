import express from "express";
const membershipRouter = express.Router();
import MembershipController from "../controllers/membershipController.js";

membershipRouter.post("/", MembershipController.createMembership);
membershipRouter.get("/", MembershipController.getAllMemberships);
membershipRouter.get("/:id", MembershipController.getMembershipByID);
membershipRouter.put("/:id", MembershipController.updateMembershipByID);
membershipRouter.delete("/:id", MembershipController.deleteMembership);

membershipRouter.get(
  "/group/:group",
  MembershipController.getMembershipsByGroup
);
membershipRouter.get(
  "/student/:student",
  MembershipController.getMembershipsByStudent
);
membershipRouter.get(
  "assignments/:id",
  MembershipController.getAssignmentsForUser
);

export default membershipRouter;
