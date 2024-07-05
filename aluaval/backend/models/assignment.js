import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Group from "./group.js";

const Assignment = sequelize.define(
  "Assignment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    submissionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isSubmitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Assignment;
