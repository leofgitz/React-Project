import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.js";
import Badge from "./badge.js";
import Group from "./group.js";

const Award = sequelize.define(
  "Award",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    giver: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    badge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Badge,
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
    recipient: {
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
    uniqueKeys: {
      unique_student_badge_per_group: {
        fields: ["giver", "badge", "group"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Award;
