import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user-m";

const Group = sequelize.define("Group", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  group: {
    type: DataTypes.STRING,
    allowNull: false,
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

Group.belongsTo(User, { foreignKey: "id" });

sequelize
  .sync()
  .then(() => {
    console.log("Table synchronized successfully!");
    module.exports = Group;
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });
