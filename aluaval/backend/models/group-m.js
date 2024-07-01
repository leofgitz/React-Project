import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user-m";
import UserGroupRelation from "./user_group_rel-m";
import GroupSubjectRelation from "./group_subject_rel-m";

const Group = sequelize.define(
  "Group",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    teacher: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

Group.belongsToMany(User, { through: UserGroupRelation, foreignKey: "group" });
Group.belongsToMany(User, {
  through: GroupSubjectRelation,
  foreignKey: "group",
});

export default Group;
