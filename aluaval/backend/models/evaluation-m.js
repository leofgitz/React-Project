import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user-m";

const Evaluation = sequelize.define(
  "Evaluation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    evaluator: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    evaluated: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
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
    },
  },
  {
    timestamps: true,
  }
);

Evaluation.belongsTo(User, { foreignKey: "evaluator" });
Evaluation.belongsTo(User, { foreignKey: "evaluated" });

export default Evaluation;
