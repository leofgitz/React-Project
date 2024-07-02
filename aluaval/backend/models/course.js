import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Subject from "./subject";

const Course = sequelize.define("Course", {
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
    allowNull: true,
  },
});

Course.hasMany(Subject, { foreignKey: "course" });

export default Course;
