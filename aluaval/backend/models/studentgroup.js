import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Student from "./student.js";
import Group from "./group.js";
import Subject from "./subject.js";

const StudentGroup = sequelize.define(
  "StudentGroup",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    uniqueKeys: {
      unique_student_group_per_subject: {
        fields: ["student", "group", "subject"],
      },
    },
  }
);

export default StudentGroup;
