import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Enrollment from "./enrollment";
import Evaluation from "./evaluation";
import StudentGroup from "./studentgroup";

const Student = sequelize.define("Student", {
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
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

Student.hasMany(Enrollment, { foreignKey: "student" });
Student.hasMany(Evaluation, { foreignKey: "evaluator" });
Student.hasMany(Evaluation, { foreignKey: "evaluated" });
Student.belongsToMany(StudentGroup, {
  through: "StudentGroup",
  foreignKey: "student",
});
Student.hasMany(GroupBadge, { foreignKey: "student", as: "Giver" });
Student.hasMany(GroupBadge, { foreignKey: "recipient", as: "Recipient" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default Student;
