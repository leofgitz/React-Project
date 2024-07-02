import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Subject from "./subject";
import Teacher from "./teacher";
import Enrollment from "./enrollment";
import Group from "./group";

const Class = sequelize.define("Class", {
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
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subject,
      key: "id",
    },
  },
  teacherId: {
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
});

Class.belongsTo(Subject, { foreignKey: "subject" });
Subject.hasMany(Class, { foreignKey: "subject" });

Class.belongsTo(Teacher, { foreignKey: "teacher" });
Teacher.hasMany(Class, { foreignKey: "teacher" });

Class.hasMany(Enrollment, { foreignKey: "class" });
Enrollment.belongsTo(Class, { foreignKey: "class" });

Class.hasMany(Group, { foreignKey: "class" });
Group.belongsTo(Class, { foreignKey: "class" });

export default Class;
