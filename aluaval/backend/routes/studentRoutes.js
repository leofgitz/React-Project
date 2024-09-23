import express from "express";
import AssignmentController from "../controllers/assignmentController";
import GroupController from "../controllers/groupController";
import CourseController from "../controllers/courseController";
import EvaluationController from "../controllers/evaluationController";
import BadgeController from "../controllers/badgeController";
const studentRouter = express.Router();

studentRouter.get(
  "/:student/assignments",
  AssignmentController.getAssignmentsForStudents
);
studentRouter.get(
  "/:student/assignments/homepage",
  AssignmentController.getStudentAssignmentsForHomepage
);

studentRouter.get("/:student/groups", GroupController.getGroupsForStudent);
studentRouter.get(
  "/:student/groups/homepage",
  GroupController.getMembershipsForHomepage
);

studentRouter.get(
  "/:student/courses",
  CourseController.getStudentCourseForStudent
);

studentRouter.get(
  "/:student/evaluations",
  EvaluationController.getEvaluationsForStudent
);
studentRouter.get(
  "/:student/evaluations/history",
  EvaluationController.studentEvaluationHistory
);

studentRouter.get("/:student/badges", BadgeController.getAwardsForStudent);
studentRouter.get(
  ":student/badges/homepage",
  BadgeController.getBadgesStudentForHomepage
);

export default studentRouter;
