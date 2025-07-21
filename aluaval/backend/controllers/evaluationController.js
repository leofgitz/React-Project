import {
  Assignment,
  Classe,
  Evaluation,
  Group,
  Membership,
  Subject,
  User,
} from "../models/index.js";
import { Op } from "sequelize";
const err500 = "Internal Server Error";

const EvaluationController = {
  createEvaluation: async (req, res) => {
    const { group, evaluator, evaluated, answers, comments, isFinal } =
      req.body;

    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    try {
      const existingEvaluation = await Evaluation.findOne({
        where: {
          evaluator,
          evaluated,
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
          group,
        },
      });

      if (existingEvaluation) {
        return res
          .status(400)
          .json({
            error: "Student has already evaluated this other student this week",
          });
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
      const evaluations = await Evaluation.findAll({
        where: { group },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User, // Include evaluator
            as: "evaluatorUser",
            attributes: ["name"],
          },
          {
            model: User, // Include evaluated
            as: "evaluatedUser",
            attributes: ["name"],
          },
          /* {
            model: Group,
            attributes: ["id"],
            include: [
              {
                model: Assignment,
                attributes: ["id", "title"],
              },
            ],
          }, */
        ],
      });

      const assignment = await Group.findOne({
        where: { id: group },
        include: [
          {
            model: Assignment,
            attributes: ["title"],
          },
        ],
      });

      // Format each evaluation with the desired structure
      const evaluationData = evaluations.map((evaluation) => {
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

        console.log(JSON.stringify(comments));

        const assignmentDue = evaluation.Group?.Assignment?.dueDate;
        const submittedAt = evaluation.createdAt;

        const isLate = assignmentDue ? submittedAt > assignmentDue : false;

        return {
          id: evaluation.id,
          evaluator: evaluator,
          evaluated: evaluated,
          evaluatorName: evaluation.evaluatorUser.name, // Add evaluator's name
          evaluatedName: evaluation.evaluatedUser.name, // Add evaluated's name
          answers: scores,
          comments,
          isFinal: evaluation.isFinal,
          averageScore: averageScore,
          createdAt: evaluation.createdAt,
          updatedAt: evaluation.updatedAt,
          isLate,
        };
      });
      const assignmentTitle = assignment.Assignment.title;

      console.log(JSON.stringify(evaluationData));

      res.status(200).json({ evaluationData, assignmentTitle });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "An error occurred while fetching evaluations by group.",
      });
    }
  },

  getEvaluationsByEvaluator: async (req, res) => {
    const { evaluator } = req.params;

    try {
      const evaluations = await Evaluation.findAll({
        where: { evaluator },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getEvaluationsByEvaluated: async (req, res) => {
    const { evaluated } = req.params;

    try {
      const evaluations = await Evaluation.findAll({
        where: { evaluated },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(evaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getEvaluationsByGroupsForTeacher: async (req, res) => {
    const teacher = req.user;

    try {
      const evaluations = await Evaluation.findAll({
        include: [
          {
            model: Group,
            include: [
              {
                model: Classe,
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
    const student = req.user;

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
    const teacher = req.user;

    try {
      const evaluations = await Evaluation.findAll({
        include: [
          {
            model: Group,
            include: [
              {
                model: Classe,
                where: { teacher },
                attributes: ["id"],
                include: [
                  {
                    model: Subject,
                    required: true,
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: Assignment,
                attributes: ["id", "title"],
              },
            ],
            attributes: ["number"], // Get only the group number
          },
          {
            model: User,
            as: "evaluatorUser", // Assuming you have an alias for evaluator
            attributes: ["name"], // Get the evaluator's name
          },
          {
            model: User,
            as: "evaluatedUser", // Assuming you have an alias for evaluated
            attributes: ["name"], // Get the evaluated user's name
          },
        ],
        attributes: [
          "createdAt",
          "updatedAt",
          "isFinal", // Assuming you have a field indicating if the evaluation is final
        ],
        group: ["Evaluation.id"],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      // Format the output
      const formattedEvaluations = evaluations.map((evaluation) => ({
        evaluator: evaluation.evaluatorUser.name,
        evaluated: evaluation.evaluatedUser.name,
        groupNumber: evaluation.Group.number,
        assignment: evaluation.Group.Assignment.title,
        createdAt: evaluation.createdAt,
        updatedAt:
          evaluation.updatedAt !== evaluation.createdAt
            ? evaluation.updatedAt
            : null,
        isFinal: evaluation.isFinal,
        subjectName: evaluation.Group.Classe?.Subject?.name,
      }));

      res.status(200).json(formattedEvaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  studentEvaluationHistory: async (req, res) => {
    const student = req.user;

    try {
      const evaluations = await Evaluation.findAll({
        where: {
          [Op.or]: [{ evaluator: student }, { evaluated: student }],
        },
        include: [
          {
            model: Group,
            attributes: ["number"], // Get only the group number
            include: [
              {
                model: Assignment,
                attributes: ["id", "title"],
              },
              {
                model: Classe,
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
          {
            model: User,
            as: "evaluatorUser", // Assuming you have an alias for evaluator
            attributes: ["name"], // Get the evaluator's name
          },
          {
            model: User,
            as: "evaluatedUser", // Assuming you have an alias for evaluated
            attributes: ["name"], // Get the evaluated user's name
          },
        ],
        attributes: [
          "createdAt",
          "updatedAt",
          "isFinal", // Assuming you have a field indicating if the evaluation is final
        ],
        group: ["Evaluation.id"],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      // Format the output
      const formattedEvaluations = evaluations.map((evaluation) => ({
        evaluator: evaluation.evaluatorUser.name,
        evaluated: evaluation.evaluatedUser.name,
        groupNumber: evaluation.Group.number,
        assignment: evaluation.Group.Assignment.title,
        createdAt: evaluation.createdAt,
        updatedAt:
          evaluation.updatedAt !== evaluation.createdAt
            ? evaluation.updatedAt
            : null,
        isFinal: evaluation.isFinal,
      }));

      res.status(200).json(formattedEvaluations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  evalcheck: async (req, res) => {
    const user = req.user;
    const { students, group, assignment } = req.body;
    const error = { error: "Unauthorized access" };

    const assignmentRecord = await Assignment.findByPk(assignment);
    if (!assignmentRecord) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const assignmentCreationDate = new Date(assignmentRecord.createdAt);
    const assignmentCreationDateWeekday = assignmentCreationDate.getDay(); // 0 (Sun) to 6 (Sat)

    const assignmentDueDate = new Date(assignmentRecord.dueDate);

    const now = new Date();
    const day = now.getDay(); // 0 (Sun) - 6 (Sat)
    const diffToMonday = (day + 6) % 7; // How many days to subtract to reach Monday

    const startWeek = new Date(now);
    startWeek.setDate(now.getDate() - diffToMonday);
    startWeek.setHours(0, 0, 0, 0); // Use setUTCHours if you're dealing with UTC consistently

    const endWeek = new Date(startWeek);
    endWeek.setDate(startWeek.getDate() + 6); // End of Sunday
    endWeek.setHours(23, 59, 59, 999);

    try {
      const isMember = await Membership.findOne({
        where: { student: user, group },
      });

      if (!isMember) {
        return res.status(403).json(error);
      }

      const isGroupInAssignment = await Group.findOne({
        where: { id: group, assignment },
      });

      if (!isGroupInAssignment) {
        return res.status(403).json(error);
      }

      const studentIds = students.map((s) => s.id);
      const memberships = await Membership.findAll({
        where: {
          student: studentIds,
          group,
        },
      });

      if (memberships.length !== studentIds.length) {
        return res.status(403).json(error);
      }

      const loopLimit = now < assignmentDueDate ? now : assignmentDueDate;
      const results = await Promise.all(
        students.map(async (student) => {
          let missed = 0;
          let finalMiss = -1;

          for (
            let weekStart = new Date(assignmentCreationDate);
            weekStart < loopLimit;
            weekStart.setDate(weekStart.getDate() + 7)
          ) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);

            const isFinal =
              assignmentDueDate >= weekStart && assignmentDueDate <= weekEnd;

            const pastWeekEvaluation = await Evaluation.findOne({
              where: {
                evaluator: user,
                evaluated: student.id,
                group,
                createdAt: {
                  [Op.between]: [weekStart, weekEnd],
                },
              },
            });

            if (!pastWeekEvaluation) {
              if (isFinal) {
                finalMiss = 1;
              } else {
                missed++;
              }
            }
          }

          const currentWeekEvaluation = await Evaluation.findOne({
            where: {
              evaluator: user,
              evaluated: student.id,
              group,
              createdAt: {
                [Op.between]: [startWeek, endWeek],
              },
            },
          });

          // After the for-loop over weeks (which increments missed, sets finalMiss=1 if no eval in final week)
          const finalWeekStart = new Date(assignmentDueDate);
          finalWeekStart.setDate(
            finalWeekStart.getDate() - finalWeekStart.getDay()
          ); // Sunday start of final week
          finalWeekStart.setHours(0, 0, 0, 0);

          const finalWeekEnd = new Date(finalWeekStart);
          finalWeekEnd.setDate(finalWeekStart.getDate() + 6); // Saturday end of final week
          finalWeekEnd.setHours(23, 59, 59, 999);

          const now = new Date();

          if (now < finalWeekStart) {
            finalMiss = -1; // final week not started yet
          } else {
            // Check if evaluation was submitted during final week
            const finalWeekEvaluation = await Evaluation.findOne({
              where: {
                evaluator: user,
                evaluated: student.id,
                group,
                createdAt: {
                  [Op.between]: [finalWeekStart, finalWeekEnd],
                },
              },
            });

            if (finalWeekEvaluation) {
              if (finalWeekEvaluation.createdAt <= assignmentDueDate) {
                finalMiss = 0; // on time submission
              } else {
                finalMiss = 2; // late submission but within final week
              }
            } else {
              if (now > finalWeekEnd) {
                finalMiss = 1; // missed final evaluation after final week passed
              } else {
                finalMiss = -1; // still time left in final week
              }
            }
          }

          return {
            student: student.id,
            complete: !!currentWeekEvaluation,
            finalmissed: finalMiss,
            missed,
          };
        })
      );

      const resultsMap = {};
      results.forEach((entry) => {
        resultsMap[entry.student] = {
          complete: entry.complete,
          finalmissed: entry.finalmissed,
          missed: entry.missed,
          message:
            entry.finalmissed === 1 && entry.missed > 0
              ? `Missed final evaluation and ${entry.missed} other evaluations.`
              : entry.finalmissed === 2 && entry.missed > 0
              ? `Final evaluation submitted late. ${entry.missed} evaluations missed.`
              : entry.finalmissed === 1
              ? "Missed final evaluation."
              : entry.finalmissed === 2
              ? "Final evaluation submitted late."
              : entry.missed > 0
              ? `${entry.missed} evaluations missed.`
              : "All evaluations complete.",
          color: entry.missed !== 0 ? "#cc3300" : "#339900",
        };
      });

      res.status(200).json(resultsMap);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default EvaluationController;
