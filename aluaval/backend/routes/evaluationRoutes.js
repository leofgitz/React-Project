import express from "express";
const evaluationRouter = express.Router();
import EvaluationController from "../controllers/evaluationController.js";

evaluationRouter.post("/", EvaluationController.createEvaluation);
evaluationRouter.get("/", EvaluationController.getAllEvaluations);
evaluationRouter.get("/:id", EvaluationController.getEvaluationByID);
evaluationRouter.patch("/:id", EvaluationController.updateEvaluationByID);
evaluationRouter.delete("/:id", EvaluationController.deleteEvaluation);

evaluationRouter.get("/group/:group", EvaluationController.getEvaluationsByGroup);
evaluationRouter.get(
  "/evaluator/:evaluator",
  EvaluationController.getEvaluationsByEvaluator
);
evaluationRouter.get(
  "/evaluated/:evaluated",
  EvaluationController.getEvaluationsByEvaluated
);
evaluationRouter.get(
  "/group/:group/average-scores",
  EvaluationController.calculateAverageScores
);

export default evaluationRouter;
