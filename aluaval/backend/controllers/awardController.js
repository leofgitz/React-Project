import { Badge, Award } from "../models/index.js";
const err500 = "Internal Server Error";

const AwardController = {
  createAward: async (req, res) => {
    const { giver, badge, group, recipient } = req.body;

    try {
      const existingAward = await Award.findOne({
        where: {
          giver,
          badge,
          group,
          recipient,
        },
      });

      if (existingAward) {
        return res.status(400).json({
          error: "Student has already awarded this badge in this group",
        });
      }

      const award = await Award.create(req.body);
      res.status(201).json(award);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllAwards: async (req, res) => {
    try {
      const awards = await Award.findAll();
      res.status(200).json(awards);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAwardByID: async (req, res) => {
    const id = req.params.id;

    try {
      const award = await Award.findByPk(id);
      if (!award) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.status(200).json(award);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateAwardByID: async (req, res) => {
    const { id } = req.params;
    const { giver, badge, group, recipient } = req.body;

    try {
      const award = await Award.findByPk(id);
      if (!award) {
        return res.status(404).json({ error: "Award not found" });
      }

      award.giver = giver || award.giver;
      award.badge = badge || award.badge;
      award.group = group || award.group;
      award.recipient = recipient || award.recipient;

      await award.save();
      res.status(200).json(award);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteAward: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await Award.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.status(200).json({ message: "Entry deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getBadgesByStudent: async (req, res) => {
    const { giver } = req.params;

    try {
      const badges = await Award.findAll({
        where: { giver },
        include: [
          {
            model: Badge,
          },
        ],
      });
      res.status(200).json(badges);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getBadgesByGroup: async (req, res) => {
    const { group } = req.params;

    try {
      const badges = await Award.findAll({ where: { group } });
      res.status(200).json(badges);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default AwardController;
