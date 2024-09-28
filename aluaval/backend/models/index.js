import sequelize from "../config/database.js";
import Course from "./course.js";
import Subject from "./subject.js";
import Classe from "./classe.js";
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
User.hasMany(Award, { foreignKey: "giver" });
User.hasMany(Award, { foreignKey: "recipient" });
User.hasMany(Evaluation, { foreignKey: "evaluator" });
User.hasMany(Evaluation, { foreignKey: "evaluated" });
User.belongsToMany(Group, {
  through: Membership,
  foreignKey: "student",
});
User.hasMany(Classe, { foreignKey: "teacher" });
User.hasOne(Course, { foreignKey: "responsibleTeacher" });
User.hasMany(Notification, { foreignKey: "user" });

Course.hasMany(Subject, { foreignKey: "course" });
Course.belongsTo(User, { foreignKey: "responsibleTeacher" });

Subject.belongsTo(Course, { foreignKey: "course" });
Subject.hasMany(Classe, { foreignKey: "subject" });

Classe.belongsTo(Subject, { foreignKey: "subject" });
Classe.belongsTo(User, { foreignKey: "teacher" });
Classe.hasMany(Enrollment, { foreignKey: "classe" });
Classe.hasMany(Group, { foreignKey: "classe" });

Enrollment.belongsTo(Classe, { foreignKey: "classe" });
Enrollment.belongsTo(User, { foreignKey: "student" });

Group.belongsTo(Classe, { foreignKey: "classe" });
Group.belongsToMany(User, {
  through: Membership,
  foreignKey: "group",
});
Group.hasMany(Assignment, { foreignKey: "group" });
Group.belongsToMany(Badge, { through: Award, foreignKey: "group" });

Badge.belongsToMany(Group, { through: Award, foreignKey: "badge" });

Award.belongsTo(User, { foreignKey: "giver"});
Award.belongsTo(User, { foreignKey: "recipient"});
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
  Classe,
  Enrollment,
  Group,
  Badge,
  Award,
  Evaluation,
  Membership,
  Assignment,
  Notification,
};
