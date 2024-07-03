const express = require('express');
const badgeRouter = express.Router();
const badgeController = require('../controllers/badgeController');

badgeRouter.post('/', badgeController.createBadge);
badgeRouter.get('/', badgeController.getAllBadges);
badgeRouter.get('/:id', badgeController.getBadgeByID);
badgeRouter.put('/:id', badgeController.updateBadgeByID);
badgeRouter.delete('/:id', badgeController.deleteBadge);

export default badgeRouter;
