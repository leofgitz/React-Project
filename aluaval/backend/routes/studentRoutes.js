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
studentRouter.get("/:student/groups", GroupController.getGroupsForStudent);
studentRouter.get(
  "/:student/courses",
  CourseController.getStudentCourseForStudent
);
studentRouter.get(
  "/:student/evaluations",
  EvaluationController.getEvaluationsForStudent
);
studentRouter.get("/:student/badges", BadgeController.getGroupBadgesForStudent);

export default studentRouter;
