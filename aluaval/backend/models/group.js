import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Assignment from "./assignment.js";
import Class from "./class.js";

const Group = sequelize.define(
  "Group",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    classe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
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
