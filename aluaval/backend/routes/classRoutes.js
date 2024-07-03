const express = require('express');
const classRouter = express.Router();
const classController = require('../controllers/classController');

classRouter.post('/', classController.createClass);
classRouter.get('/', classController.getAllClasses);
classRouter.get('/:id', classController.getClassByID);
classRouter.put('/:id', classController.updateClassByID);
classRouter.delete('/:id', classController.deleteClass);

export default classRouter;
