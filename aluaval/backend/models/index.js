import sequelize from "../config/database.js";
import Course from "./course.js";
import Subject from "./subject.js";
import Class from "./class.js";
import Enrollment from "./enrollment.js";
import Group from "./group.js";
import Badge from "./badge.js";
import Award from "./award.js";
import Evaluation from "./evaluation.js";
import Membership from "./membership.js";
import Assignment from "./assignment.js";
import User from "./user.js";
import Notification from "./notification.js";

User.hasMany(Enrollment, { foreignKey: "student" });
User.hasMany(Award, { foreignKey: "student", as: "Giver" });
User.hasMany(Award, { foreignKey: "recipient", as: "Recipient" });
User.hasMany(Evaluation, { foreignKey: "evaluator" });
User.hasMany(Evaluation, { foreignKey: "evaluated" });
User.belongsToMany(Group, {
  through: Membership,
  foreignKey: "student",
});
User.hasMany(Class, { foreignKey: "teacher" });
User.hasOne(Course, { foreignKey: "responsibleTeacher" });
User.hasMany(Notification, { foreignKey: "user" });

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
  through: Membership,
  foreignKey: "group",
});
Group.hasMany(Assignment, { foreignKey: "group" });
Group.belongsToMany(Badge, { through: Award, foreignKey: "group" });

Badge.belongsToMany(Group, { through: Award, foreignKey: "badge" });

Award.belongsTo(User, { foreignKey: "student", as: "Giver" });
Award.belongsTo(User, { foreignKey: "recipient", as: "Recipient" });
Award.belongsTo(Group, { foreignKey: "group" });
Award.belongsTo(Badge, { foreignKey: "badge" });

Evaluation.belongsTo(User, { foreignKey: "evaluator" });
Evaluation.belongsTo(User, { foreignKey: "evaluated" });
Evaluation.belongsTo(Group, { foreignKey: "group" });

Membership.belongsTo(User, { foreignKey: "student" });
Membership.belongsTo(Group, { foreignKey: "group" });

Assignment.belongsTo(Group, { foreignKey: "group" });

Notification.belongsTo(User, { foreignKey: "user" });

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
  Award,
  Evaluation,
  Membership,
  Assignment,
  Notification,
};
