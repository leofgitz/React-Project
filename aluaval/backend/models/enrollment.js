import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Class from "./class";
import Student from "./student";

const Enrollment = sequelize.define("Enrollment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  class: {
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
});

Enrollment.belongsTo(Class, { foreignKey: "classId" });
Class.hasMany(Enrollment, { foreignKey: "classId" });

Enrollment.belongsTo(Student, { foreignKey: "studentId" });
Student.hasMany(Enrollment, { foreignKey: "studentId" });

export default Enrollment;
