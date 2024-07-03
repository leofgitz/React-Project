const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/courseController');

courseRouter.post('/', courseController.createCourse);
courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/:id', courseController.getCourseByID);
courseRouter.put('/:id', courseController.updateCourseByID);
courseRouter.delete('/:id', courseController.deleteCourse);

export default courseRouter;
