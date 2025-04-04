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
import applyHooks from "./hooks/index.js";

User.hasMany(Enrollment, { foreignKey: "student" });
User.hasMany(Award, { foreignKey: "giver", as: "giverUser" });
User.hasMany(Award, { foreignKey: "recipient", as: "recipientUser" });
User.hasMany(Evaluation, { foreignKey: "evaluator", as: "evaluatorUser" });
User.hasMany(Evaluation, { foreignKey: "evaluated", as: "evaluatedUser" });
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

Assignment.belongsTo(User, { foreignKey: "teacher" });
Assignment.belongsTo(Subject, { foreignKey: "subject" });
Assignment.hasMany(Group, { foreignKey: "assignment" });

Enrollment.belongsTo(Classe, { foreignKey: "classe" });
Enrollment.belongsTo(User, { foreignKey: "student" });

Group.belongsTo(Classe, { foreignKey: "classe" });
Group.belongsToMany(User, {
  through: Membership,
  foreignKey: "group",
});
Group.belongsTo(Assignment, { foreignKey: "assignment" });

Award.belongsTo(User, { foreignKey: "giver", as: "giverUser" });
Award.belongsTo(User, { foreignKey: "recipient", as: "recipientUser" });
Award.belongsTo(Group, { foreignKey: "group" });
Award.belongsTo(Badge, { foreignKey: "badge" });

Evaluation.belongsTo(User, { foreignKey: "evaluator", as: "evaluatorUser" });
Evaluation.belongsTo(User, { foreignKey: "evaluated", as: "evaluatedUser" });
Evaluation.belongsTo(Group, { foreignKey: "group" });

Notification.belongsTo(User, { foreignKey: "user" });

export async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

applyHooks();

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
