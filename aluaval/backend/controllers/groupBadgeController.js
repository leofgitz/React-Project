import { GroupBadge } from "../models/index.js";
const err500 = "Internal Server Error";

const GroupBadgeController = {
  createGroupBadge: async (req, res) => {
    const { student, badge, group } = req.body;

    try {
      const existingGroupBadge = await GroupBadge.findOne({
        where: {
          student,
          badge,
          group,
        },
      });

      if (existingGroupBadge) {
        return res.status(400).json({
          error: "Student has already awarded this badge in this group",
        });
      }

      const groupBadge = await GroupBadge.create(req.body);
      res.status(201).json(groupBadge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllGroupBadges: async (req, res) => {
    try {
      const groupBadges = await GroupBadge.findAll();
      res.status(200).json(groupBadges);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getGroupBadgeByID: async (req, res) => {
    const id = req.params.id;

    try {
      const groupBadge = await GroupBadge.findByPk(id);
      if (!groupBadge) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.status(200).json(groupBadge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateGroupBadgeByID: async (req, res) => {
    const { id } = req.params;
    const { student, badge, group, recipient } = req.body;

    try {
      const groupBadge = await GroupBadge.findByPk(id);
      if (!groupBadge) {
        return res.status(404).json({ error: "GroupBadge not found" });
      }

      groupBadge.student = student || groupBadge.student;
      groupBadge.badge = badge || groupBadge.badge;
      groupBadge.group = group || groupBadge.group;
      groupBadge.recipient = recipient || groupBadge.recipient;

      await groupBadge.save();
      res.status(200).json(groupBadge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteGroupBadge: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await GroupBadge.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.status(200).json({ message: "Entry deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default GroupBadgeController;
