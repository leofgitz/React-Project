import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/database";
import User from "./user-m";
import Group from "./group-m";

const UserGroupRelation = sequelize.define("UserGroupRelation", {
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
  student: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
}, {
  timestamps: true
});

export default UserGroupRelation;
