const express = require('express');
const assignmentRouter = express.Router();
const assignmentController = require('../controllers/assignmentController');

assignmentRouter.post('/', assignmentController.createAssignment);
assignmentRouter.get('/', assignmentController.getAllAssignments);
assignmentRouter.get('/:id', assignmentController.getAssignmentByID);
assignmentRouter.put('/:id', assignmentController.updateAssignmentByID);
assignmentRouter.delete('/:id', assignmentController.deleteAssignment);

export default assignmentRouter;
