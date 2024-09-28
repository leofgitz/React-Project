import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Classe from "./classe.js";
import User from "./user.js";

const Enrollment = sequelize.define(
  "Enrollment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    classe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Classe,
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
  },
  {
    timestamps: true,
  }
);

export default Enrollment;
