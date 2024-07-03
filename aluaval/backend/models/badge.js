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
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

Badge.hasMany(GroupBadge, { foreignKey: 'badge' });

export default Badge;
