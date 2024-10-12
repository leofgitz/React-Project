import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Assignment from "./assignment.js";
import Classe from "./classe.js";

const Group = sequelize.define(
  "Group",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    classe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Classe,
        key: "id",
      },
    },
    assignment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Assignment,
        key: "id",
      },
    },
    submissionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["classe", "number"],
      },
    ],
  }
);
export default Group;
