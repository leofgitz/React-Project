import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user-m";
import Subject from "./subject-m";

const UserSubjectRelation = sequelize.define("UserSubjectRelation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  subject: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subject,
      key: "id",
    },
  },
  teacher: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  student: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

export default UserSubjectRelation;
