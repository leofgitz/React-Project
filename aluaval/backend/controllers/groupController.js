import { Group, User } from "../models/index.js";
const err500 = "Internal Server Error";

const GroupController = {
  createGroup: async (req, res) => {
    const { classe } = req.body;

    if (!classe) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      const group = await Group.create(req.body);
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
    const id = req.params.id;

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
    const { classe } = req.body;

    try {
      const group = await Group.findByPk(id);
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }

      group.classe = classe || group.classe;

      await group.save();
      res.status(200).json(group);
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
};

export default GroupController;
