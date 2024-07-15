import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Subject from "./subject.js";
import Assignment from "./assignment.js";

const Group = sequelize.define(
  "Group",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    assignment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Assignment,
        key: "id",
      },
    },
    
  },
  {
    timestamps: true,
  }
);
export default Group;
