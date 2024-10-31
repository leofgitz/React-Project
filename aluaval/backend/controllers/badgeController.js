import { Badge, Classe, Group, Award, Subject, User } from "../models/index.js";
const err500 = "Internal Server Error";

const BadgeController = {
  createBadge: async (req, res) => {
    const { name, icon } = req.body;

    if (!name && !icon) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const badge = await Badge.create(req.body);
      res.status(201).json(badge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllBadges: async (req, res) => {
    try {
      const badges = await Badge.findAll();
      res.status(200).json(badges);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getBadgeByID: async (req, res) => {
    const id = req.params.id;

    try {
      const badge = await Badge.findByPk(id);
      if (!badge) {
        return res.status(404).json({ error: "Badge not found" });
      }
      res.status(200).json(badge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateBadgeByID: async (req, res) => {
    const { id } = req.params;
    const { name, icon } = req.body;

    try {
      const badge = await Badge.findByPk(id);
      if (!badge) {
        return res.status(404).json({ error: "Badge not found" });
      }

      if (name !== undefined && name !== badge.name) {
        badge.name = name;
      }
      if (icon !== undefined && icon !== badge.icon) {
        badge.icon = icon;
      }

      await badge.save();
      res.status(200).json(badge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteBadge: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRows = await Badge.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Badge not found" });
      }
      res.status(200).json({ message: "Badge removed " });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

};

export default BadgeController;
