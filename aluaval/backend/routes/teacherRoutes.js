import express from "express";
import AssignmentController from "../controllers/assignmentController.js";
import GroupController from "../controllers/groupController.js";
import SubjectController from "../controllers/subjectController.js";
import EvaluationController from "../controllers/evaluationController.js";
import BadgeController from "../controllers/badgeController.js";
const teacherRouter = express.Router();

teacherRouter.get(
  "/:teacher/assignments",
  AssignmentController.getAssignmentsForTeacher
);
teacherRouter.get(
  "/:teacher/assignments/homepage",
  AssignmentController.getTeacherAssignmentsForHomepage
);

teacherRouter.get("/:teacher/groups", GroupController.getGroupsForTeacher);
teacherRouter.get(
  "/:teacher/groups/homepage",
  GroupController.getTeacherGroupsForHomepage
);

teacherRouter.get(
  "/:teacher/subjects",
  SubjectController.getSubjectsForTeacher
);
teacherRouter.get(
  "/:teacher/subjects/homepage",
  SubjectController.getTeacherSubjectsForHomepage
);

teacherRouter.get(
  "/:teacher/evaluations",
  EvaluationController.getEvaluationsByGroupsForTeacher
);
teacherRouter.get(
  "/:teacher/evaluations/history",
  EvaluationController.teacherEvaluationHistory
);

teacherRouter.get("/:teacher/badges", BadgeController.getAwardsForTeacher);
teacherRouter.get(
  "/:teacher/badges/homepage",
  BadgeController.getBadgesTeacherForHomepage
);

export default teacherRouter;
