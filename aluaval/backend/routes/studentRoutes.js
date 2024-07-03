const express = require('express');
const studentRouter = express.Router();
const studentController = require('../controllers/studentController');

studentRouter.post('/', studentController.createStudent);
studentRouter.get('/', studentController.getAllStudents);
studentRouter.get('/:id', studentController.getStudentByID);
studentRouter.put('/:id', studentController.updateStudentByID);
studentRouter.delete('/:id', studentController.deleteStudent);

export default studentRouter;
