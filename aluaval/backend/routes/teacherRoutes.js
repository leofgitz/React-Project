import express from "express";
import AssignmentController from "../controllers/assignmentController";
import GroupController from "../controllers/groupController";
import SubjectController from "../controllers/subjectController";
import EvaluationController from "../controllers/evaluationController";
import BadgeController from "../controllers/badgeController";
const teacherRouter = express.Router();

teacherRouter.get(
  "/:id/assignments",
  AssignmentController.getGroupAssignmentsForTeacher
);
teacherRouter.get("/:id/groups", GroupController.getGroupsForTeacher);
teacherRouter.get("/:id/subjects", SubjectController.getSubjectsForTeacher);
teacherRouter.get(
  "/:id/evaluations",
  EvaluationController.getEvaluationsByGroupsForTeacher
);
teacherRouter.get("/:id/badges", BadgeController.getGroupBadgesForTeacher);

export default teacherRouter;
