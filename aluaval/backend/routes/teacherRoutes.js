const express = require('express');
const teacherRouter = express.Router();
const teacherController = require('../controllers/teacherController');

teacherRouter.post('/', teacherController.createTeacher);
teacherRouter.get('/', teacherController.getAllTeachers);
teacherRouter.get('/:id', teacherController.getTeacherByID);
teacherRouter.put('/:id', teacherController.updateTeacherByID);
teacherRouter.delete('/:id', teacherController.deleteTeacher);

export default teacherRouter;
