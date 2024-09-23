import userRouter from "./userRoutes.js";
import courseRouter from "./courseRoutes.js";
import subjectRouter from "./subjectRoutes.js";
import classRouter from "./classRoutes.js";
import enrollmentRouter from "./enrollmentRoutes.js";
import groupRouter from "./groupRoutes.js";
import badgeRouter from "./badgeRoutes.js";
import awardRouter from "./awardRoutes.js";
import evaluationRouter from "./evaluationRoutes.js";
import assignmentRouter from "./assignmentRoutes.js";
import membershipRouter from "./membershipRoutes.js";
import authRouter from "./authRoutes.js";
import authentication from "../middleware/authentication.js";
import teacherRouter from "./teacherRoutes.js";
import studentRouter from "./studentRoutes.js";
import isStudent from "../middleware/isStudent.js";
import isTeacher from "../middleware/isTeacher.js";

const routes = (app) => {
  app.use("/api/courses", authentication, courseRouter);
  app.use("/api/subjects", authentication, subjectRouter);
  app.use("/api/classes", authentication, classRouter);
  app.use("/api/users", authentication, userRouter);
  app.use("/api/enrollments", authentication, enrollmentRouter);
  app.use("/api/groups", authentication, groupRouter);
  app.use("/api/badges", authentication, badgeRouter);
  app.use("/api/awards", authentication, awardRouter);
  app.use("/api/evaluations", authentication, evaluationRouter);
  app.use("/api/assignments", authentication, assignmentRouter);
  app.use("/api/memberships", authentication, membershipRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/teacher", authentication, isTeacher, teacherRouter);
  app.use("/api/student", authentication, isStudent, studentRouter);
};

export default routes;
