import { Assignment, Group, StudentGroup, User } from "../models/index.js";
const err500 = "Internal Server Error";

const StudentGroupController = {
  createStudentGroup: async (req, res) => {
    const { student, group, subject } = req.body;

    if (!student || !group || !subject) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      let studentGroup = await StudentGroup.findOne({
        where: {
          student,
          subject,
        },
      });

      if (studentGroup) {
        return res.status(400).json({
          error: "This student is already in a group for this subject",
        });
      }

      studentGroup = await StudentGroup.create(req.body);
      res.status(201).json(studentGroup);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllStudentGroups: async (req, res) => {
    try {
      const studentGroups = await StudentGroup.findAll();
      res.status(200).json(studentGroups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentGroupByID: async (req, res) => {
    const id = req.params.id;

    try {
      const studentGroup = await StudentGroup.findByPk(id);
      if (!studentGroup) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.status(200).json(studentGroup);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateStudentGroupByID: async (req, res) => {
    const { id } = req.params;
    const { student, group, subject } = req.body;

    try {
      const studentGroup = await StudentGroup.findByPk(id);
      if (!studentGroup) {
        return res.status(404).json({ error: "StudentGroup not found" });
      }

      studentGroup.student = student || studentGroup.student;
      studentGroup.group = group || studentGroup.group;
      studentGroup.subject = subject || studentGroup.subject;

      await studentGroup.save();
      res.status(200).json(studentGroup);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteStudentGroup: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await StudentGroup.destroy({ where: { id } });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "Entry not found" });
      }

      res.status(200).json({ message: "Entry deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentGroupsByGroup: async (req, res) => {
    const { group } = req.params;

    try {
      const studentGroups = await StudentGroup.findAll({
        where: { group },
        include: [{ model: User, as: "student" }],
      });
      const students = studentGroups.map(
        (studentGroup) => studentGroup.student
      );

      res.status(200).json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentGroupsByStudent: async (req, res) => {
    const { student } = req.params;

    try {
      const studentGroups = await StudentGroup.findAll({ where: { student } });
      res.status(200).json(studentGroups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAssignmentsForUser: async (req, res) => {
    const { id } = req.params;

    try {
      const studentGroups = await StudentGroup.findAll({
        where: { student: id },
        include: [
          {
            model: Group,
            include: [
              {
                model: Assignment,
              },
            ],
          },
        ],
      });

      const assignments = studentGroups.flatMap((studentGroup) => {
        const group = studentGroup.group;
        return group && group.assignment ? group.assignment : [];
      });

      res.stataus(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  
  getGroupMembers
};

export default StudentGroupController;
