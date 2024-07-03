import Assignment from "../models/assignment";

const err500 = "Internal Server Error";

const AssignmentController = {
  createAssignment: async (req, res) => {
    const { group, title, dueDate, submissionDate } = req.body;

    if (!group || !title || !dueDate || !submissionDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const assignment = await Assignment.create({
        group,
        title,
        dueDate,
        submissionDate,
      });
      res.status(201).json(assignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllAssignments: async (req, res) => {
    try {
      const assignments = await Assignment.findAll({
        order: [["group", "ASC"]],
      });
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
    const { group, title, dueDate, submissionDate, isSubmitted } = req.body;

    try {
      const assignment = await Assignment.findByPk(id);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      assignment.group = group || assignment.group;
      assignment.title = title || assignment.title;
      assignment.dueDate = dueDate || assignment.dueDate;
      assignment.submissionDate = submissionDate || assignment.submissionDate;
      assignment.isSubmitted =
        isSubmitted !== undefined ? isSubmitted : assignment.isSubmitted;

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
};

export default AssignmentController;
