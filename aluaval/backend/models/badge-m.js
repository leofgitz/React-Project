import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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

sequelize
  .sync()
  .then(() => {
    console.log("Table synchronized successfully!");
    module.exports = Badge;
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });
