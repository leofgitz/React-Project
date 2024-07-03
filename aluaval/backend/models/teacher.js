import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Class from "./class";
import Course from "./course";

const Teacher = sequelize.define("Teacher", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

Teacher.hasMany(Class, { foreignKey: "teacher" });
Teacher.hasOne(Course, { foreignKey: "responsibleTeacher" });

export default Teacher;
