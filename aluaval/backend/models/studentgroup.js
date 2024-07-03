import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Student from "./student";
import Group from "./group";
import Subject from "./subject";

const StudentGroup = sequelize.define("StudentGroup", {
  student: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Student,
      key: "id",
    },
  },
  group: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Group,
      key: "id",
    },
  },
  subject: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Subject,
      key: "id",
    },
  },
});

Student.belongsToMany(Group, { through: StudentGroup, foreignKey: "student" });
Group.belongsToMany(Student, { through: StudentGroup, foreignKey: "group" });
Group.hasMany(StudentGroup, { foreignKey: "group" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default StudentGroup;
