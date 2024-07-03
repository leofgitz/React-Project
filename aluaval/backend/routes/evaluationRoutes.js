const express = require('express');
const evaluationRouter = express.Router();
const evaluationController = require('../controllers/evaluationController');

evaluationRouter.post('/', evaluationController.createEvaluation);
evaluationRouter.get('/', evaluationController.getAllEvaluations);
evaluationRouter.get('/:id', evaluationController.getEvaluationByID);
evaluationRouter.put('/:id', evaluationController.updateEvaluationByID);
evaluationRouter.delete('/:id', evaluationController.deleteEvaluation);

export default evaluationRouter;
