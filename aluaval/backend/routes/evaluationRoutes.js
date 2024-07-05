import express from 'express';
const evaluationRouter = express.Router();
import EvaluationController from '../controllers/evaluationController.js';

evaluationRouter.post('/', EvaluationController.createEvaluation);
evaluationRouter.get('/', EvaluationController.getAllEvaluations);
evaluationRouter.get('/:id', EvaluationController.getEvaluationByID);
evaluationRouter.put('/:id', EvaluationController.updateEvaluationByID);
evaluationRouter.delete('/:id', EvaluationController.deleteEvaluation);

export default evaluationRouter;
