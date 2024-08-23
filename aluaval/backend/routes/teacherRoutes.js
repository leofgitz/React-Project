import express from "express";
import AssignmentController from "../controllers/assignmentController";
import GroupController from "../controllers/groupController";
import SubjectController from "../controllers/subjectController";
import EvaluationController from "../controllers/evaluationController";
import BadgeController from "../controllers/badgeController";
const teacherRouter = express.Router();

teacherRouter.get(
  "/:teacher/assignments",
  AssignmentController.getAssignmentsForTeacher
);
teacherRouter.get("/:teacher/groups", GroupController.getGroupsForTeacher);
teacherRouter.get(
  "/:teacher/subjects",
  SubjectController.getSubjectsForTeacher
);
teacherRouter.get(
  "/:teacher/evaluations",
  EvaluationController.getEvaluationsByGroupsForTeacher
);
teacherRouter.get("/:teacher/badges", BadgeController.getGroupBadgesForTeacher);

export default teacherRouter;
