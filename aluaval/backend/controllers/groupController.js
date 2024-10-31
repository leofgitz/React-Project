import { Classe, Group, Membership } from "../models/index.js";
const err500 = "Internal Server Error";

const GroupController = {
  createGroup: async (req, res) => {
    const { classe, assignment } = req.body;

    if (!classe || !assignment) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      const lastGroup = await Group.findOne({
        where: { classe },
        order: [["number", "DESC"]],
      });

      const number = lastGroup ? lastGroup.number + 1 : 1;

      const group = await Group.create({
        classe,
        assignment,
        number,
      });
      res.status(201).json(group);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllGroups: async (req, res) => {
    try {
      const groups = await Group.findAll();
      res.status(200).json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getGroupByID: async (req, res) => {
    const { id } = req.params;

    try {
      const group = await Group.findByPk(id);
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
      res.status(200).json(group);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateGroupByID: async (req, res) => {
    const { id } = req.params;
    const { classe, assignment, submissionDate } = req.body;

    try {
      const group = await Group.findByPk(id);
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }

      if (classe !== undefined && classe !== group.classe) {
        group.classe = classe;
      }

      if (assignment !== undefined && assignment !== group.assignment) {
        group.assignment = assignment;
      }

      if (
        submissionDate !== undefined &&
        submissionDate !== group.submissionDate
      ) {
        group.submissionDate = submissionDate;
      }

      await group.save();
      res.status(200).json(group);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateSubmissionDate: async (req, res) => {
    const { id } = req.params;
    const { submissionDate } = req.body;

    try {
      const group = await Group.findByPk(id);

      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }

      group.submissionDate = submissionDate;
      await group.save();
      res.status(200).json({ message: "Submission date updated!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteGroup: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = Group.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Group not found" });
      }
      res.status(200).json({ message: "Group removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getGroupsBySubject: async (req, res) => {
    const { subject } = req.params;

    try {
      const groups = await Group.findAll({ where: { subject } });
      res.status(200).json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getGroupsByAssignment: async (req, res) => {
    const { assignment } = req.params;
    try {
      const groups = await Group.findAll({ where: { assignment } });
      res.status(200).json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getGroupsForTeacher: async (req, res) => {
    const teacher = req.user;
    try {
      const groups = await Group.findAll({
        include: [
          {
            model: Classe,
            where: { teacher },
            attributes: [],
          },
        ],
        group: ["Group.id"],
      });

      res.status(200).json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getGroupsForStudent: async (req, res) => {
    const student = req.user;

    try {
      const groups = await Group.findAll({
        include: [
          {
            model: Membership,
            where: { student },
            attributes: [],
          },
        ],
        group: ["Group.id"],
      });

      res.status(200).json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getTeacherGroupsForHomepage: async (req, res) => {
    const teacher = req.user;
    try {
      const groups = await Group.findAll({
        include: [
          {
            model: Classe,
            where: { teacher },
            attributes: [],
          },
        ],
        group: ["Group.id"],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      res.status(200).json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentGroupsForHomepage: async (req, res) => {
    const student = req.user;

    try {
      const groups = await Group.findAll({
        include: [
          {
            model: Membership,
            where: { student },
            attributes: [],
          },
        ],
        group: ["Group.id"],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      res.status(200).json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getLastNumberForGroupMaking: async (req, res) => {
    const { classe } = req.params;

    try {
      const number = await Group.findOne({
        where: { classe },
        attributes: ["number"],
        order: [["number", "DESC"]],
      });

      const groupNumber = number ? number.number : 0;

      res.status(200).json({ groupNumber });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default GroupController;
