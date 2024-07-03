import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Subject from "./subject";
import Teacher from "./teacher";

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
  responsibleTeacher: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Teacher,
      key: "id",
    },
  },
});

Course.hasMany(Subject, { foreignKey: "course" });
Course.belongsTo(Teacher, { foreignKey: "responsibleTeacher" });

export default Course;