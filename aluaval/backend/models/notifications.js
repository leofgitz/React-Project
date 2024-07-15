import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.js";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: id,
      },
    },
    type: {
      type: DataTypes.ENUM("Assignment", "Badge", "Evaluation"),
      allowNull: false,
    },
    reference: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Notification;
