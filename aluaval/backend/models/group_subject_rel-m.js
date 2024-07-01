import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Group from "./group-m";
import Subject from "./subject-m";

const GroupSubjectRelation = sequelize.define("GroupSubjectRelation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
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
});

export default GroupSubjectRelation;
