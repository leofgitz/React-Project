import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Badge from "./badge-m";
import UserBadgeRelation from "./user_badge_rel-m";
import UserGroupRelation from "./user_group_rel-m";
import Group from "./group-m";
import Evaluation from "./evaluation-m";

const User = sequelize.define(
  "User",
  {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

User.belongsToMany(Badge, { through: UserBadgeRelation, foreignKey: "giver" });
User.belongsToMany(Badge, {
  through: UserBadgeRelation,
  foreignKey: "receiver",
});
User.belongsToMany(Group, {
  through: UserGroupRelation,
  foreignKey: "student",
});
User.hasMany(Evaluation, { foreignKey: "evaluator" });
User.hasMany(Evaluation, { foreignKey: "evaluated" });

export default User;
