const express = require('express');
const groupRouter = express.Router();
const groupController = require('../controllers/groupController');

groupRouter.post('/', groupController.createGroup);
groupRouter.get('/', groupController.getAllGroups);
groupRouter.get('/:id', groupController.getGroupByID);
groupRouter.put('/:id', groupController.updateGroupByID);
groupRouter.delete('/:id', groupController.deleteGroup);

export default groupRouter;
