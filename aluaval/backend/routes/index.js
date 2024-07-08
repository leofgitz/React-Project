import studentRouter from "./studentRoutes.js";
import teacherRouter from "./teacherRoutes.js";
import courseRouter from "./courseRoutes.js";
import subjectRouter from "./subjectRoutes.js";
import classRouter from "./classRoutes.js";
import enrollmentRouter from "./enrollmentRoutes.js";
import groupRouter from "./groupRoutes.js";
import badgeRouter from "./badgeRoutes.js";
import groupBadgeRouter from "./groupBadgeRoutes.js";
import evaluationRouter from "./evaluationRoutes.js";
import assignmentRouter from "./assignmentRoutes.js";
import studentGroupRouter from "./studentGroupRoutes.js";
import authRouter from "./authRoutes.js";
import authentication from "../middleware/authentication.js";

const routes = (app) => {
  app.use("/api/students", /* authentication, */ studentRouter);
  app.use("/api/courses", /* authentication, */ courseRouter);
  app.use("/api/subjects", /* authentication, */ subjectRouter);
  app.use("/api/classes", /* authentication, */ classRouter);
  app.use("/api/teachers", /* authentication, */ teacherRouter);
  app.use("/api/enrollments", /* authentication, */ enrollmentRouter);
  app.use("/api/groups", /* authentication, */ groupRouter);
  app.use("/api/badges", /* authentication, */ badgeRouter);
  app.use("/api/group-badges", /* authentication, */ groupBadgeRouter);
  app.use("/api/evaluations", /* authentication, */ evaluationRouter);
  app.use("/api/assignments", /* authentication, */ assignmentRouter);
  app.use("/api/student-groups", /* authentication, */ studentGroupRouter);
  app.use("/api/auth", authRouter);
};

export default routes;
