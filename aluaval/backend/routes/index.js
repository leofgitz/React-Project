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
const groupBadgeRoutes = require('./groupBadgeRoutes');

mainRouter.use("/api/students", studentRoutes);
mainRouter.use("/api/teachers", teacherRoutes);
mainRouter.use("/api/auth", authRoutes);
mainRouter.use("/api/evaluations", evaluationRoutes);
mainRouter.use("/api/courses", courseRoutes);
mainRouter.use("/api/subjects", subjectRoutes);
mainRouter.use("/api/classes", classRoutes);
mainRouter.use("/api/enrollments", enrollmentRoutes);
mainRouter.use("/api/groups", groupRoutes);
mainRouter.use("/api/student-groups", studentGroupRoutes);
mainRouter.use("/api/assignments", assignmentRoutes);
mainRouter.use('/api/badges', badgeRoutes);
mainRouter.use('/api/groupbadges', groupBadgeRoutes);

export default mainRouter;
