import sequelize from "../config/database.js";
import Student from "./student.js";
import Teacher from "./teacher.js";
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

Student.hasMany(Enrollment, { foreignKey: "student" });
Student.hasMany(GroupBadge, { foreignKey: "student", as: "Giver" });
Student.hasMany(GroupBadge, { foreignKey: "recipient", as: "Recipient" });
Student.hasMany(Evaluation, { foreignKey: "evaluator" });
Student.hasMany(Evaluation, { foreignKey: "evaluated" });
Student.belongsToMany(Group, {
  through: StudentGroup,
  foreignKey: "student",
});

Teacher.hasMany(Class, { foreignKey: "teacher" });
Teacher.hasOne(Course, { foreignKey: "responsibleTeacher" });

Course.hasMany(Subject, { foreignKey: "course" });
Course.belongsTo(Teacher, { foreignKey: "responsibleTeacher" });

Subject.belongsTo(Course, { foreignKey: "course" });
Subject.hasMany(Class, { foreignKey: "subject" });

Class.belongsTo(Subject, { foreignKey: "subject" });
Class.belongsTo(Teacher, { foreignKey: "teacher" });
Class.hasMany(Enrollment, { foreignKey: "classe" });
Class.hasMany(Group, { foreignKey: "classe" });

Enrollment.belongsTo(Class, { foreignKey: "class" });
Enrollment.belongsTo(Student, { foreignKey: "student" });

Group.belongsTo(Class, { foreignKey: "classe" });
Group.belongsToMany(Student, {
  through: StudentGroup,
  foreignKey: "group",
});
Group.hasMany(Assignment, { foreignKey: "group" });
Group.belongsToMany(Badge, { through: GroupBadge, foreignKey: "group" });

Badge.belongsToMany(Group, { through: GroupBadge, foreignKey: "badge" });

GroupBadge.belongsTo(Student, { foreignKey: "student", as: "Giver" });
GroupBadge.belongsTo(Student, { foreignKey: "recipient", as: "Recipient" });

Evaluation.belongsTo(Student, { foreignKey: "evaluator" });
Evaluation.belongsTo(Student, { foreignKey: "evaluated" });
Evaluation.belongsTo(Assignment, { foreignKey: "assignment" });

StudentGroup.belongsTo(Student, { foreignKey: "student" });
StudentGroup.belongsTo(Group, { foreignKey: "group" });
StudentGroup.belongsTo(Subject, { foreignKey: "subject" });

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
  Student,
  Teacher,
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
