import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user-m";
import UserGroupRelation from "./user_group_rel-m";

const Group = sequelize.define("Group", {
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
});

Group.belongsToMany(User, { through: UserGroupRelation, foreignKey: "group" });

export default Group;
