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

const routes = (app) => {
  app.use("/api/students", studentRouter);
  app.use("/api/courses", courseRouter);
  app.use("/api/subjects", subjectRouter);
  app.use("/api/classes", classRouter);
  app.use("/api/teachers", teacherRouter);
  app.use("/api/enrollments", enrollmentRouter);
  app.use("/api/groups", groupRouter);
  app.use("/api/badges", badgeRouter);
  app.use("/api/group-badges", groupBadgeRouter);
  app.use("/api/evaluations", evaluationRouter);
  app.use("/api/assignments", assignmentRouter);
  app.use("/api/student-groups", studentGroupRouter);
  app.use("/api/auth", authRouter);
};

export default routes;
