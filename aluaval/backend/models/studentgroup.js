import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Group from "./group.js";
import User from "./user.js";

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
        model: User,
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
    submissionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    uniqueKeys: {
      unique_student_group_per_subject: {
        fields: ["student", "group"],
      },
    },
  }
);

export default StudentGroup;
