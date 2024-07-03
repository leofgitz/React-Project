import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Group from "./group";

const Assignment = sequelize.define("Assignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  group: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Group,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  submissionDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isSubmitted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Assignment.belongsTo(Group, { foreignKey: "group" });
Group.hasMany(Assignment, { foreignKey: "group" });

export default Assignment;
