import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user-m";
import UserBadgeRelation from "./user_badge_rel-m";

const Badge = sequelize.define(
  "Badge",
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
    img: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

Badge.belongsToMany(User, { through: UserBadgeRelation, foreignKey: "badge" });

export default Badge;
