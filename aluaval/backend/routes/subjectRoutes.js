const express = require('express');
const subjectRouter = express.Router();
const subjectController = require('../controllers/subjectController');

subjectRouter.post('/', subjectController.createSubject);
subjectRouter.get('/', subjectController.getAllSubjects);
subjectRouter.get('/:id', subjectController.getSubjectByID);
subjectRouter.put('/:id', subjectController.updateSubjectByID);
subjectRouter.delete('/:id', subjectController.deleteSubject);

export default subjectRouter;
