import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Group from "./group.js";
import User from "./user.js";

const Membership = sequelize.define(
  "Membership",
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
    }
  },
  {
    timestamps: true,
  }
);

export default Membership;
