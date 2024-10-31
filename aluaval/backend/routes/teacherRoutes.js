import express from "express";
import AssignmentController from "../controllers/assignmentController.js";
import GroupController from "../controllers/groupController.js";
import SubjectController from "../controllers/subjectController.js";
import EvaluationController from "../controllers/evaluationController.js";
import AwardController from "../controllers/awardController.js";
import UserController from "../controllers/userController.js";
const teacherRouter = express.Router();

teacherRouter.get(
  "/assignments",
  AssignmentController.getAssignmentsForTeacher
);
teacherRouter.get(
  "/assignments/homepage",
  AssignmentController.getTeacherAssignmentsForHomepage
);
teacherRouter.get(
  "/subjects/:subject/assignments",
  AssignmentController.getAssignmentsForTeacherBasedOnSubject
);

teacherRouter.get("/groups", GroupController.getGroupsForTeacher);
teacherRouter.get(
  "/groups/homepage",
  GroupController.getTeacherGroupsForHomepage
);
teacherRouter.get("/lastgroupno/:classe", GroupController.getLastNumberForGroupMaking);
teacherRouter.get(
  "/:subject/:assignment",
  UserController.getStudentsAndGroupsForAssignment
);

teacherRouter.get("/subjects", SubjectController.getSubjectsForTeacher);
teacherRouter.get(
  "/subjects/homepage",
  SubjectController.getTeacherSubjectsForHomepage
);

teacherRouter.get(
  "/evaluations",
  EvaluationController.getEvaluationsByGroupsForTeacher
);
teacherRouter.get(
  "/evaluations/history",
  EvaluationController.teacherEvaluationHistory
);

teacherRouter.get("/awards", AwardController.getAwardsForTeacher);
teacherRouter.get(
  "/awards/homepage",
  AwardController.getBadgesTeacherForHomepage
);

export default teacherRouter;
