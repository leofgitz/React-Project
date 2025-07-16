import express from "express";
import AssignmentController from "../controllers/assignmentController.js";
import GroupController from "../controllers/groupController.js";
import CourseController from "../controllers/courseController.js";
import EvaluationController from "../controllers/evaluationController.js";
import AwardController from "../controllers/awardController.js";
import SubjectController from "../controllers/subjectController.js";
import UserController from "../controllers/userController.js";
const studentRouter = express.Router();

studentRouter.get(
  "/assignments",
  AssignmentController.getAssignmentsForStudents
);
studentRouter.get(
  "/assignments/homepage",
  AssignmentController.getStudentAssignmentsForHomepage
);
studentRouter.get("/groups", GroupController.getGroupsForStudent);

studentRouter.get("/subjects", SubjectController.getSubjectsForStudent);

studentRouter.get(
  "/subjects/:subject/assignments",
  AssignmentController.getAssignmentsForStudentBasedOnSubject
);

studentRouter.get(
  "/assignments/:assignment",
  UserController.getUsersInGroupForAssignment
);

studentRouter.get("/courses", CourseController.getStudentCourseForStudent);

studentRouter.get(
  "/evaluations",
  EvaluationController.getEvaluationsForStudent
);
studentRouter.get(
  "/evaluations/history",
  EvaluationController.studentEvaluationHistory
);
studentRouter.post("/evalcheck", EvaluationController.evalcheck);

/* studentRouter.get("/badges", AwardController.getAwardsForStudent); */
studentRouter.get(
  "/awards/homepage",
  AwardController.getBadgesStudentForHomepage
);

export default studentRouter;
