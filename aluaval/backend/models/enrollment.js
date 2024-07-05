import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Class from "./class.js";
import Student from "./student.js";

const Enrollment = sequelize.define(
  "Enrollment",
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
    student: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Enrollment;
