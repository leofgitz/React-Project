import {
  Assignment,
  Class,
  Evaluation,
  Group,
  Subject,
} from "../models/index.js";
const err500 = "Internal Server Error";

const EvaluationController = {
  createEvaluation: async (req, res) => {
    const { group, evaluator, evaluated, answers, comments } = req.body;

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

      let evaluationData = {
        group: group,
        evaluator: evaluator,
        evaluated: evaluated,
        attendanceScore: answers[0],
        participationScore: answers[1],
        teamworkScore: answers[2],
        qualityScore: answers[3],
        attitudeScore: answers[4],
        feedbackScore: answers[5],

        attendanceComment: comments[0],
        participationComment: comments[1],
        teamworkComment: comments[2],
        qualityComment: comments[3],
        attitudeComment: comments[4],
        feedbackComment: comments[5],

        isFinal: isFinal,
      };

      if (evaluated === evaluator) {
        evaluationData.goalsComment = comments[6];
        evaluationData.additionalComment = comments[7];
      } else {
        evaluationData.impressionScore = answers[6];
        evaluationData.impressionComment = comments[6];
      }

      const evaluation = await Evaluation.create(evaluationData);
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
    const { id } = req.params;

    try {
      const evaluation = await Evaluation.findByPk(id);
      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }

      const { evaluated, evaluator } = evaluation;

      const scores = [
        evaluation.attendanceScore,
        evaluation.participationScore,
        evaluation.teamworkScore,
        evaluation.qualityScore,
        evaluation.attitudeScore,
        evaluation.feedbackScore,
      ];

      const comments = [
        evaluation.attendanceComment,
        evaluation.participationComment,
        evaluation.teamworkComment,
        evaluation.qualityComment,
        evaluation.attitudeComment,
        evaluation.feedbackComment,
      ];

      if (evaluated === evaluator) {
        comments.push(evaluation.goalsComment, evaluation.additionalComment);
      } else {
        scores.push(evaluation.impressionScore);
        comments.push(evaluation.impressionComment);
      }

      const averageScore =
        scores.length > 0
          ? scores.reduce((sum, score) => sum + score, 0) / scores.length
          : 0;

      const evaluationData = {
        id: evaluation.id,
        group: evaluation.group,
        evaluator: evaluator,
        evaluated: evaluated,
        answers: scores,
        comments: comments,
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
    const { id } = req.params;
    const { group, answers, comments, evaluated, evaluator } = req.body;

    try {
      const evaluation = await Evaluation.findByPk(id);
      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }

      if (group !== undefined && group !== evaluation.group) {
        evaluation.group = group;
      }

      if (evaluator !== undefined && evaluator !== evaluation.evaluator) {
        evaluation.evaluator = evaluator;
      }

      if (evaluated !== undefined && evaluated !== evaluation.evaluated) {
        evaluation.evaluated = evaluated;
      }

      if (answers) {
        if (
          answers[0] !== undefined &&
          answers[0] !== evaluation.attendanceScore
        ) {
          evaluation.attendanceScore = answers[0];
        }
        if (
          answers[1] !== undefined &&
          answers[1] !== evaluation.participationScore
        ) {
          evaluation.participationScore = answers[1];
        }
        if (
          answers[2] !== undefined &&
          answers[2] !== evaluation.teamworkScore
        ) {
          evaluation.teamworkScore = answers[2];
        }
        if (
          answers[3] !== undefined &&
          answers[3] !== evaluation.qualityScore
        ) {
          evaluation.qualityScore = answers[3];
        }
        if (
          answers[4] !== undefined &&
          answers[4] !== evaluation.attitudeScore
        ) {
          evaluation.attitudeScore = answers[4];
        }
        if (
          answers[5] !== undefined &&
          answers[5] !== evaluation.feedbackScore
        ) {
          evaluation.feedbackScore = answers[5];
        }
        if (
          answers[6] !== undefined &&
          answers[6] !== evaluation.impressionScore
        ) {
          evaluation.impressionScore = answers[6];
        }
      }

      if (comments) {
        if (
          comments[0] !== undefined &&
          comments[0] !== evaluation.attendanceComment
        ) {
          evaluation.attendanceComment = comments[0];
        }
        if (
          comments[1] !== undefined &&
          comments[1] !== evaluation.participationComment
        ) {
          evaluation.participationComment = comments[1];
        }
        if (
          comments[2] !== undefined &&
          comments[2] !== evaluation.teamworkComment
        ) {
          evaluation.teamworkComment = comments[2];
        }
        if (
          comments[3] !== undefined &&
          comments[3] !== evaluation.qualityComment
        ) {
          evaluation.qualityComment = comments[3];
        }
        if (
          comments[4] !== undefined &&
          comments[4] !== evaluation.attitudeComment
        ) {
          evaluation.attitudeComment = comments[4];
        }
        if (
          comments[5] !== undefined &&
          comments[5] !== evaluation.feedbackComment
        ) {
          evaluation.feedbackComment = comments[5];
        }
        if (comments[6] !== undefined) {
          if (evaluated === evaluator) {
            if (comments[6] !== evaluation.goalsComment) {
              evaluation.goalsComment = comments[6];
            }
            if (comments[7] !== evaluation.additionalComment) {
              evaluation.additionalComment = comments[7];
            }
          } else {
            if (comments[6] !== evaluation.impressionComment) {
              evaluation.impressionComment = comments[6];
            }
          }
        }
      }
      
      if (isFinal !== undefined && isFinal !== evaluation.isFinal) {
        evaluation.isFinal = isFinal;
      }

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
      res.status(200).json({ message: "Evaluation removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getEvaluationsByGroup: async (req, res) => {
    const { group } = req.params;

    try {
      const evaluations = await Evaluation.findAll({ where: { group } });
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
            attributes: ["id"],
          },
        ],
        group: ["Group.id"],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getEvaluationsForStudent: async (req, res) => {
    const { student } = req.params;

    try {
      const evaluations = await Evaluation.findAll({
        where: {
          [Op.or]: [{ evaluator: student }, { evaluated: student }],
        },
        group: ["Group.id"],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({ evaluations });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  teacherEvaluationHistory: async (req, res) => {
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
                include: [
                  {
                    model: Subject,
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: Assignment,
                attributes: ["id", "title"],
              },
            ],
            attributes: ["id"],
          },
        ],
        group: ["Evaluation.id"],
        order: [["createdAt", "DESC"]],
        limit: 5,
      });

      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  studentEvaluationHistory: async (req, res) => {
    const { student } = req.params;

    try {
      const evaluations = await Evaluation.findAll({
        where: {
          [Op.or]: [{ evaluator: student }, { evaluated: student }],
        },
        include: [
          {
            model: Group,
            attributes: [],
            include: [
              {
                model: Assignment,
                attributes: ["id", "title"],
              },
              {
                model: Class,
                attributes: [],
                include: [
                  {
                    model: Subject,
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
        ],
        group: ["Evaluation.id"],
        order: [["createdAt", "DESC"]],
        limit: 5,
      });

      res.status(200).json({ evaluations });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default EvaluationController;
