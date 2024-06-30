import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Badge from "./badge-m";
import User from "./user-m";

const UserBadgeRelation = sequelize.define("UserBadgeRelation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  badge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Badge,
      key: "id",
    },
  },
  giver: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  receiver: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

UserBadgeRelation.belongsTo(Badge, { foreignKey: "id" });
UserBadgeRelation.belongsTo(User, { foreignKey: "id" });

sequelize
  .sync()
  .then(() => {
    console.log("Table synchronized successfully!");
    module.exports = UserBadgeRelation;
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

