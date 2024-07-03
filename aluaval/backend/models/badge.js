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

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default Badge;
