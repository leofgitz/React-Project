import Badge from "../models/badge";
const err500 = "Internal Server Error";

const BadgeController = {
  createBadge: async (req, res) => {
    const { name, img } = req.body;

    if (!name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const badge = await Badge.create({ name, img });
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
    const { name, img } = req.body;

    try {
      const badge = await Badge.findByPk(id);
      if (!badge) {
        return res.status(404).json({ error: "Badge not found" });
      }

      badge.name = name || badge.name;
      badge.img = img || badge.img;

      await badge.save();
      res.status(200).json(badge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteBadge: async (req, res) => {
    const id = req.params.id;

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