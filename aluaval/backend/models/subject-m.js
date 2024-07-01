import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user-m";
import UserSubjectRelation from "./user_subject_rel-m";
import GroupSubjectRelation from "./group_subject_rel-m";

const Subject = sequelize.define("Subject", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Subject.belongsToMany(User, {
  through: UserSubjectRelation,
  foreignKey: "subject",
});
Subject.belongsToMany(User, {
  through: GroupSubjectRelation,
  foreignKey: "subject",
});

export default Subject;
