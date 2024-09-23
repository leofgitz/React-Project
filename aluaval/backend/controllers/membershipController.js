import { Assignment, Group, Membership, User } from "../models/index.js";
const err500 = "Internal Server Error";

const MembershipController = {
  createMembership: async (req, res) => {
    const { student, group, subject } = req.body;

    if (!student || !group || !subject) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      let membership = await Membership.findOne({
        where: {
          student,
          subject,
        },
      });

      if (membership) {
        return res.status(400).json({
          error: "This student is already in a group for this subject",
        });
      }

      membership = await Membership.create(req.body);
      res.status(201).json(membership);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllMemberships: async (req, res) => {
    try {
      const memberships = await Membership.findAll();
      res.status(200).json(memberships);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getMembershipByID: async (req, res) => {
    const id = req.params.id;

    try {
      const membership = await Membership.findByPk(id);
      if (!membership) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.status(200).json(membership);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateMembershipByID: async (req, res) => {
    const { id } = req.params;
    const { student, group, subject } = req.body;

    try {
      const membership = await Membership.findByPk(id);
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }

      membership.student = student || membership.student;
      membership.group = group || membership.group;
      membership.subject = subject || membership.subject;

      await membership.save();
      res.status(200).json(membership);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteMembership: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await Membership.destroy({ where: { id } });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "Entry not found" });
      }

      res.status(200).json({ message: "Entry deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getMembershipsByGroup: async (req, res) => {
    const { group } = req.params;

    try {
      const memberships = await Membership.findAll({
        where: { group },
        include: [{ model: User, as: "student" }],
      });
      const students = memberships.map((membership) => membership.student);

      res.status(200).json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getMembershipsByStudent: async (req, res) => {
    const { student } = req.params;

    try {
      const memberships = await Membership.findAll({ where: { student } });
      res.status(200).json(memberships);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAssignmentsForUser: async (req, res) => {
    const { id } = req.params;

    try {
      const memberships = await Membership.findAll({
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

      const assignments = memberships.flatMap((membership) => {
        const group = membership.group;
        return group && group.assignment ? group.assignment : [];
      });

      res.stataus(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getGroupMembers,
};

export default MembershipController;
