import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Subject from "./subject.js";
import Teacher from "./teacher.js";

const Class = sequelize.define(
  "Class",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    teacher: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: "id",
      },
    },
    schedule: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Class;
