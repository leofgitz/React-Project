const express = require('express');
const groupBadgeRouter = express.Router();
const groupBadgeController = require('../controllers/groupBadgeController');

groupBadgeRouter.post('/', groupBadgeController.createGroupBadge);
groupBadgeRouter.get('/', groupBadgeController.getAllGroupBadges);
groupBadgeRouter.get('/:id', groupBadgeController.getGroupBadgeByID);
groupBadgeRouter.put('/:id', groupBadgeController.updateGroupBadgeByID);
groupBadgeRouter.delete('/:id', groupBadgeController.deleteGroupBadge);

export default groupBadgeRouter;
