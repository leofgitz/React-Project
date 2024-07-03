const express = require('express');
const enrollmentRouter = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

enrollmentRouter.post('/', enrollmentController.createEnrollment);
enrollmentRouter.get('/', enrollmentController.getAllEnrollments);
enrollmentRouter.get('/:id', enrollmentController.getEnrollmentByID);
enrollmentRouter.put('/:id', enrollmentController.updateEnrollmentByID);
enrollmentRouter.delete('/:id', enrollmentController.deleteEnrollment);

export default enrollmentRouter;
