const express = require("express");
const mainRouter = express.Router();

const studentRoutes = require("./studentRoutes");
const teacherRoutes = require("./teacherRoutes");
const authRoutes = require("./authRoutes");
const evaluationRoutes = require("./evaluationRoutes");
const courseRoutes = require("./courseRoutes");
const subjectRoutes = require("./subjectRoutes");
const classRoutes = require("./classRoutes");
const enrollmentRoutes = require("./enrollmentRoutes");
const groupRoutes = require("./groupRoutes");
const studentGroupRoutes = require("./studentGroupRoutes");
const assignmentRoutes = require("./assignmentRoutes");
const groupBadgeRoutes = require("./groupBadgeRoutes");

mainRouter.use("/students", studentRoutes);
mainRouter.use("/teachers", teacherRoutes);
mainRouter.use("/auth", authRoutes);
mainRouter.use("/evaluations", evaluationRoutes);
mainRouter.use("/courses", courseRoutes);
mainRouter.use("/subjects", subjectRoutes);
mainRouter.use("/classes", classRoutes);
mainRouter.use("/enrollments", enrollmentRoutes);
mainRouter.use("/groups", groupRoutes);
mainRouter.use("/student-groups", studentGroupRoutes);
mainRouter.use("/assignments", assignmentRoutes);
mainRouter.use("/badges", badgeRoutes);
mainRouter.use("/group-badges", groupBadgeRoutes);

export default mainRouter;
