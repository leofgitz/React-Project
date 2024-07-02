const express = require('express');
const router = express.Router();

const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const authRoutes = require('./authRoutes');
const evaluationRoutes = require('./evaluationRoutes');
const courseRoutes = require('./courseRoutes');
const subjectRoutes = require('./subjectRoutes');
const classRoutes = require('./classRoutes');
const enrollmentRoutes = require('./enrollmentRoutes');
const groupRoutes = require('./groupRoutes');
const studentGroupRoutes = require('./studentGroupRoutes');
const assignmentRoutes = require('./assignmentRoutes');

router.use('/api', studentRoutes);
router.use('/api', teacherRoutes);
router.use('/api', authRoutes);
router.use('/api', evaluationRoutes);
router.use('/api', courseRoutes);
router.use('/api', subjectRoutes);
router.use('/api', classRoutes);
router.use('/api', enrollmentRoutes);
router.use('/api', groupRoutes);
router.use('/api', studentGroupRoutes);
router.use('/api', assignmentRoutes);

module.exports = router;