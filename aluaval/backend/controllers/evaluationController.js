import { Evaluation, Group } from "../models/index.js";
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

      const scores = [
        evaluation.attendanceScore,
        evaluation.participationScore,
        evaluation.teamworkScore,
        evaluation.qualityScore,
        evaluation.attitudeScore,
        evaluation.feedbackScore,
        evaluation.impressionScore,
      ];

      const nonZeroScores = scores.filter((score) => score !== 0);

      const averageScore =
        nonZeroScores.length > 0
          ? nonZeroScores.reduce((sum, score) => sum + score, 0) /
            nonZeroScores.length
          : 0;

      const evaluationData = {
        id: evaluation.id,
        group: evaluation.group,
        evaluator: evaluation.evaluator,
        evaluated: evaluation.evaluated,
        answers: scores,
        comments: [
          evaluation.attendanceComment,
          evaluation.participationComment,
          evaluation.teamworkComment,
          evaluation.qualityComment,
          evaluation.attitudeComment,
          evaluation.feedbackComment,
          evaluation.impressionComment,
          evaluation.goalsComment,
          evaluation.additionalComment,
        ],
        isFinal: evaluation.isFinal,
        averageScore: averageScore,
        createdAt: evaluation.createdAt,
        updatedAt: evaluation.updatedAt,
      };
      res.status(200).json(evaluationData);
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
  getEvaluationsByGroup: async (req, res) => {
    const { groupId } = req.params;

    try {
      const evaluations = await Evaluation.findAll({ where: { groupId } });
      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getEvaluationsByEvaluator: async (req, res) => {
    const { evaluator } = req.params;

    try {
      const evaluations = await Evaluation.findAll({ where: { evaluator } });
      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getEvaluationsByEvaluated: async (req, res) => {
    const { evaluated } = req.params;

    try {
      const evaluations = await Evaluation.findAll({ where: { evaluated } });
      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  calculateAverageScores: async (req, res) => {
    const { group } = req.params;

    try {
      const evaluations = await Evaluation.findAll({ where: { group } });

      const averageScores = evaluations.reduce(
        (acc, evaluation) => {
          acc.attendanceScore += evaluation.attendanceScore;
          acc.participationScore += evaluation.participationScore;
          acc.teamworkScore += evaluation.teamworkScore;
          acc.qualityScore += evaluation.qualityScore;
          acc.attitudeScore += evaluation.attitudeScore;
          acc.feedbackScore += evaluation.feedbackScore;
          acc.impressionScore += evaluation.impressionScore;
          return acc;
        },
        {
          attendanceScore: 0,
          participationScore: 0,
          teamworkScore: 0,
          qualityScore: 0,
          attitudeScore: 0,
          feedbackScore: 0,
          impressionScore: 0,
        }
      );

      const count = evaluations.length;
      Object.keys(averageScores).forEach((key) => {
        averageScores[key] = averageScores[key] / count;
      });

      res.status(200).json(averageScores);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getEvaluationsByGroupsForTeacher: async (req, res) => {
    const { teacher } = req.params;

    try {
      const evaluations = await Evaluation.findAll({
        include: [
          {
            model: Group,
            include: [
              {
                model: Class,
                where: { teacher },
                attributes: [],
              },
            ],
            attributes: [],
          },
        ],
        group: ["Evaluation.id"],
      });

      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default EvaluationController;
