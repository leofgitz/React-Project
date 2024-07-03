const express = require('express');
const studentGroupRouter = express.Router();
const studentGroupController = require('../controllers/studentGroupController');

studentGroupRouter.post('/', studentGroupController.createStudentGroup);
studentGroupRouter.get('/', studentGroupController.getAllStudentGroups);
studentGroupRouter.get('/:id', studentGroupController.getStudentGroupByID);
studentGroupRouter.put('/:id', studentGroupController.updateStudentGroupByID);
studentGroupRouter.delete('/:id', studentGroupController.deleteStudentGroup);

export default studentGroupRouter;
