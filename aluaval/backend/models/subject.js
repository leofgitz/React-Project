import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Course from "./course";
import Class from "./class";

const Subject = sequelize.define("Subject", {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  course: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "id",
    },
  },
});

Subject.belongsTo(Course, { foreignKey: "course" });
Course.hasMany(Subject, { foreignKey: "course" });
Subject.hasMany(Class, { foreignKey: "subject" });

export default Subject;
