import Evaluation from "../models/evaluation-m";

const err500 = "Internal Server Error";

const EvaluationController = {
  getEvaluationByID: async (req, res) => {
    const id = req.params.id;

    try {
      const evaluation = await Evaluation.findByPk(id);
      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }
      res.status(200).json(evaluation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  createEvaluation: async (req, res) => {
    try {
      const newEvaluation = await Evaluation.create(req.body);
      res.status(201).json(newEvaluation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  updateEvaluation: async (req, res) => {
    const { id } = req.params.id;
    const newEvaluationData = req.body;
    try {
      const fieldsToUpdate = [
        "attendanceScore",
        "attendanceComment",
        "participationScore",
        "participationComment",
        "teamworkScore",
        "teamworkComment",
        "qualityScore",
        "qualityComment",
        "attitudeScore",
        "attitudeComment",
        "feedbackScore",
        "feedbackComment",
        "impressionScore",
        "impressionComment",
        "goalsComment",
        "additionalComment",
      ];

      const updateData = {};
      for (const field of fieldsToUpdate) {
        if (newEvaluationData.hasOwnProperty(field)) {
          updateData[field] = newEvaluationData[field];
        }
      }

      const [updatedRowsCount, [updatedEvaluation]] = await Evaluation.update(
        updateData,
        {
          where: { id: id },
          returning: true,
          individualHooks: true,
        }
      );

      if (updatedRowsCount === 0) {
        return res
          .status(404)
          .json({ error: "Evaluation not found or no changes made." });
      }

      return res.status(200).json(updatedEvaluation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default EvaluationController;
