import {Evaluation} from "../models/index.js";
const err500 = "Internal Server Error";

const EvaluationController = {
  createEvaluation: async (req, res) => {
    const { evaluator, evaluated } = req.body;

    try {
      const existingEvaluation = await Evaluation.findOne({
        where: {
          evaluator,
          evaluated,
        },
      });

      if (existingEvaluation) {
        return res
          .status(400)
          .json({ error: "Student has already evaluated this other student" });
      }

      const evaluation = await Evaluation.create(req.body);
      res.status(201).json(evaluation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllEvaluations: async (req, res) => {
    try {
      const evaluations = await Evaluation.findAll();
      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

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

  updateEvaluationByID: async (req, res) => {
    const id = req.params.id;
    const {
      attendanceScore,
      attendanceComment,
      participationScore,
      participationComment,
      teamworkScore,
      teamworkComment,
      qualityScore,
      qualityComment,
      attitudeScore,
      attitudeComment,
      feedbackScore,
      feedbackComment,
      impressionScore,
      impressionComment,
      goalsComment,
      additionalComment,
      isFinal,
    } = req.body;

    try {
      const evaluation = await Evaluation.findByPk(id);
      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }

      evaluation.attendanceScore =
        attendanceScore || evaluation.attendanceScore;
      evaluation.attendanceComment =
        attendanceComment || evaluation.attendanceComment;
      evaluation.participationScore =
        participationScore || evaluation.participationScore;
      evaluation.participationComment =
        participationComment || evaluation.participationComment;
      evaluation.teamworkScore = teamworkScore || evaluation.teamworkScore;
      evaluation.teamworkComment =
        teamworkComment || evaluation.teamworkComment;
      evaluation.qualityScore = qualityScore || evaluation.qualityScore;
      evaluation.qualityComment = qualityComment || evaluation.qualityComment;
      evaluation.attitudeScore = attitudeScore || evaluation.attitudeScore;
      evaluation.attitudeComment =
        attitudeComment || evaluation.attitudeComment;
      evaluation.feedbackScore = feedbackScore || evaluation.feedbackScore;
      evaluation.feedbackComment =
        feedbackComment || evaluation.feedbackComment;
      evaluation.impressionScore =
        impressionScore || evaluation.impressionScore;
      evaluation.impressionComment =
        impressionComment || evaluation.impressionComment;
      evaluation.goalsComment = goalsComment || evaluation.goalsComment;
      evaluation.additionalComment =
        additionalComment || evaluation.additionalComment;
      evaluation.isFinal = isFinal !== undefined ? isFinal : evaluation.isFinal;

      await evaluation.save();
      res.status(200).json(evaluation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteEvaluation: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await Evaluation.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Evaluation not found" });
      }
      res.status(200).json({ message: "Evaluation removed successfully " });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default EvaluationController;
