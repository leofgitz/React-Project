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
});

Enrollment.belongsTo(Class, { foreignKey: "classe" });
Class.hasMany(Enrollment, { foreignKey: "classe" });

Enrollment.belongsTo(Student, { foreignKey: "student" });
Student.hasMany(Enrollment, { foreignKey: "student" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default Enrollment;
