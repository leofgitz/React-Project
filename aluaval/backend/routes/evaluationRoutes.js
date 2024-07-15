import express from "express";
const evaluationRouter = express.Router();
import EvaluationController from "../controllers/evaluationController.js";

evaluationRouter.post("/", EvaluationController.createEvaluation);
evaluationRouter.get("/", EvaluationController.getAllEvaluations);
evaluationRouter.get("/:id", EvaluationController.getEvaluationByID);
evaluationRouter.put("/:id", EvaluationController.updateEvaluationByID);
evaluationRouter.delete("/:id", EvaluationController.deleteEvaluation);

router.get("/group/:group", EvaluationController.getEvaluationsByGroup);
router.get(
  "/evaluator/:evaluator",
  EvaluationController.getEvaluationsByEvaluator
);
router.get(
  "/evaluated/:evaluated",
  EvaluationController.getEvaluationsByEvaluated
);
router.get(
  "/group/:group/average-scores",
  EvaluationController.calculateAverageScores
);

export default evaluationRouter;
