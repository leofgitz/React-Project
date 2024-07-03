import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Student from "./student";

const Evaluation = sequelize.define(
  "Evaluation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    assignment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Assignment,
        key: "id",
      },
    },
    evaluator: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    evaluated: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    attendanceScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attendanceComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    participationScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participationComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    teamworkScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamworkComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    qualityScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qualityComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attitudeScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attitudeComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    feedbackScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    feedbackComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    //impressionScore e impressionComment não aparecem em autoavaliações
    impressionScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    impressionComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    //goalsComment só aparece em autoavaliações
    goalsComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    additionalComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isFinal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

/* Evaluation.beforeCreate(async (evaluation, options) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentEvaluation = await Evaluation.findOne({
    where: {
      evaluator: evaluation.evaluator,
      evaluated: evaluation.evaluated,
      createdAt: { [Op.gt]: oneWeekAgo },
    },
  });

  if (recentEvaluation) {
    throw new Error(
      "An evaluation for this Student pair has already been submitted within the last week."
    );
  }
}); */

Evaluation.belongsTo(Student, { foreignKey: "evaluator" });
Evaluation.belongsTo(Student, { foreignKey: "evaluated" });
Evaluation.belongsTo(Assignment, { foreignKey: "assignment" });

export default Evaluation;