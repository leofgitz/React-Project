import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Class from "./class";
import StudentGroup from "./studentgroup";
import Assignment from "./assignment";

const Group = sequelize.define("Group", {
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
      model: Class,
      key: "id",
    },
  },
});

Group.belongsTo(Class, { foreignKey: "classe" });
Class.hasMany(Group, { foreignKey: "classe" });

Group.hasMany(StudentGroup, { foreignKey: "group" });
StudentGroup.belongsTo(Group, { foreignKey: "group" });

Group.hasMany(Assignment, { foreignKey: "group" });
Assignment.belongsTo(Group, { foreignKey: "group" });

export default Group;
