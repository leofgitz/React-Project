import {
  Assignment,
  Class,
  Group,
  Membership,
  Subject,
} from "../models/index.js";

const err500 = "Internal Server Error";

const AssignmentController = {
  createAssignment: async (req, res) => {
    const { title, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const assignment = await Assignment.create({
        title,
        dueDate,
      });
      res.status(201).json(assignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllAssignments: async (req, res) => {
    try {
      const assignments = await Assignment.findAll();
      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAssignmentByID: async (req, res) => {
    const id = req.params.id;

    try {
      const assignment = await Assignment.findByPk(id);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }
      res.status(200).json(assignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateAssignmentByID: async (req, res) => {
    const id = req.params.id;
    const { title, dueDate } = req.body;

    try {
      const assignment = await Assignment.findByPk(id);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      assignment.title = title || assignment.title;
      assignment.dueDate = dueDate || assignment.dueDate;

      await assignment.save();
      res.status(200).json(assignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteAssignment: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await Assignment.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Assignment not found" });
      }
      res.status(200).json({ message: "Assignment removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAssignmentsForTeacher: async (req, res) => {
    const { teacher } = req.params;

    try {
      const assignments = await Assignment.findAll({
        include: [
          {
            model: Group,
            include: [
              {
                model: Class,
                where: { teacher },
                attributes: [],
              },
              {
                model: Membership,
                attributes: ["submissionDate"],
              },
            ],
            attributes: ["id"],
          },
        ],
        group: ["Assignment.id"],
      });

      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAssignmentsForStudents: async (req, res) => {
    const { student } = req.params;

    try {
      const assignments = await Assignment.findAll({
        include: [
          {
            model: Group,
            include: [
              {
                model: Membership,
                where: { student },
                attributes: ["submissionDate"],
              },
            ],
            attributes: ["id"],
          },
        ],
        group: ["Assignment.id"],
      });

      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getTeacherAssignmentsForHomepage: async (req, res) => {
    const { teacher } = req.params;

    try {
      const assignments = await Assignment.findAll({
        include: [
          {
            model: Group,
            attributes: ["id"],
            include: [
              {
                model: Class,
                where: { teacher },
                attributes: [],
                include: [
                  {
                    model: Subject,
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: Membership,
                attributes: ["submissionDate"],
              },
            ],
          },
        ],
        group: ["Assignment.id"],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentAssignmentsForHomepage: async (req, res) => {
    const { student } = req.params;

    try {
      const assignments = await Assignment.findAll({
        include: [
          {
            model: Group,
            include: [
              {
                model: Membership,
                where: { student },
                attributes: ["submissionDate"],
              },
              {
                model: Class,
                attributes: [],
                include: [
                  {
                    model: Subject,
                    attributes: ["name"],
                  },
                ],
              },
            ],
            attributes: ["id"],
          },
        ],
        group: ["Assignment.id"],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default AssignmentController;
