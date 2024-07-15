import sequelize from "../config/database.js";
import Course from "./course.js";
import Subject from "./subject.js";
import Class from "./class.js";
import Enrollment from "./enrollment.js";
import Group from "./group.js";
import Badge from "./badge.js";
import GroupBadge from "./groupBadge.js";
import Evaluation from "./evaluation.js";
import StudentGroup from "./studentgroup.js";
import Assignment from "./assignment.js";
import User from "./user.js";

User.hasMany(Enrollment, { foreignKey: "student" });
User.hasMany(GroupBadge, { foreignKey: "student", as: "Giver" });
User.hasMany(GroupBadge, { foreignKey: "recipient", as: "Recipient" });
User.hasMany(Evaluation, { foreignKey: "evaluator" });
User.hasMany(Evaluation, { foreignKey: "evaluated" });
User.belongsToMany(Group, {
  through: StudentGroup,
  foreignKey: "student",
});

User.hasMany(Class, { foreignKey: "teacher" });
User.hasOne(Course, { foreignKey: "responsibleTeacher" });

Course.hasMany(Subject, { foreignKey: "course" });
Course.belongsTo(User, { foreignKey: "responsibleTeacher" });

Subject.belongsTo(Course, { foreignKey: "course" });
Subject.hasMany(Class, { foreignKey: "subject" });

Class.belongsTo(Subject, { foreignKey: "subject" });
Class.belongsTo(User, { foreignKey: "teacher" });
Class.hasMany(Enrollment, { foreignKey: "classe" });
Class.hasMany(Group, { foreignKey: "classe" });

Enrollment.belongsTo(Class, { foreignKey: "class" });
Enrollment.belongsTo(User, { foreignKey: "student" });

Group.belongsTo(Class, { foreignKey: "classe" });
Group.belongsToMany(User, {
  through: StudentGroup,
  foreignKey: "group",
});
Group.hasMany(Assignment, { foreignKey: "group" });
Group.belongsToMany(Badge, { through: GroupBadge, foreignKey: "group" });

Badge.belongsToMany(Group, { through: GroupBadge, foreignKey: "badge" });

GroupBadge.belongsTo(User, { foreignKey: "student", as: "Giver" });
GroupBadge.belongsTo(User, { foreignKey: "recipient", as: "Recipient" });
GroupBadge.belongsTo(Group, { foreignKey: "group" });
GroupBadge.belongsTo(Badge, { foreignKey: "badge" });

Evaluation.belongsTo(User, { foreignKey: "evaluator" });
Evaluation.belongsTo(User, { foreignKey: "evaluated" });
Evaluation.belongsTo(Group, { foreignKey: "group" });

StudentGroup.belongsTo(User, { foreignKey: "student" });
StudentGroup.belongsTo(Group, { foreignKey: "group" });

Assignment.belongsTo(Group, { foreignKey: "group" });

async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

syncModels();

export {
  User,
  Course,
  Subject,
  Class,
  Enrollment,
  Group,
  Badge,
  GroupBadge,
  Evaluation,
  StudentGroup,
  Assignment,
};
