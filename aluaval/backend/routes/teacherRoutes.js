import express from "express";
import AssignmentController from "../controllers/assignmentController.js";
import GroupController from "../controllers/groupController.js";
import SubjectController from "../controllers/subjectController.js";
import EvaluationController from "../controllers/evaluationController.js";
import AwardController from "../controllers/awardController.js";
import UserController from "../controllers/userController.js";
import ClasseController from "../controllers/classController.js";
const teacherRouter = express.Router();

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
teacherRouter.get(
  "/lastgroupno/:classe/:assignment",
  GroupController.getLastNumberForGroupMaking
);
teacherRouter.get("/classe/:subject/classe", ClasseController.getClassForGroupMaking);

teacherRouter.get(
  "/evaluations/history",
  EvaluationController.teacherEvaluationHistory
);

teacherRouter.get("/awards", AwardController.getAwardsForTeacher);

teacherRouter.get(
  "/awards/homepage",
  AwardController.getBadgesTeacherForHomepage
);

teacherRouter.get(
  "/assignment/:subject/:assignment",
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

export default teacherRouter;
