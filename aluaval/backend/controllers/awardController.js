import {
  Badge,
  Award,
  User,
  Group,
  Assignment,
  Classe,
} from "../models/index.js";
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

      if (giver !== undefined && giver !== award.giver) {
        award.giver = giver;
      }
      if (badge !== undefined && badge !== award.badge) {
        award.badge = badge;
      }
      if (group !== undefined && group !== award.group) {
        award.group = group;
      }
      if (recipient !== undefined && recipient !== award.recipient) {
        award.recipient = recipient;
      }

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
            attributes: ["name", "icon"],
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
      const badges = await Award.findAll({
        where: { group },
        include: [
          {
            model: Badge,
            attributes: ["id", "name", "icon"], // Badge details
          },
          {
            model: User,
            attributes: ["id", "name"], // Student details
          },
        ],
        attributes: [
          "recipient", // Include recipient ID for grouping
          [fn("COUNT", col("Badge.id")), "badgeCount"], // Count unique badge instances
        ],
        group: ["Award.recipient", "Badge.id"], // Group by recipient and badge
      });

      // Format result into nested structure
      const nestedResult = badges.reduce((acc, badge) => {
        const studentId = badge.recipient;
        const studentName = badge.User.name;
        const badgeData = {
          badgeId: badge.Badge.id,
          badgeName: badge.Badge.name,
          badgeIcon: badge.Badge.icon,
          badgeCount: badge.dataValues.badgeCount,
        };

        // Check if student already exists in the result
        const student = acc.find((item) => item.studentId === studentId);
        if (student) {
          // Add badge to existing student
          student.badges.push(badgeData);
        } else {
          // Create new student entry
          acc.push({
            studentId,
            studentName,
            badges: [badgeData],
          });
        }

        return acc;
      }, []);

      res.status(200).json(nestedResult);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "An error occurred while fetching badges for the group.",
      });
    }
  },

  getAwardsForTeacher: async (req, res) => {
    const teacher = req.user;

    try {
      const awards = await Group.findAll({
        include: [
          {
            model: Classe,
            where: { teacher },
            attributes: [],
          },
          {
            model: Award,
            attributes: [],
            include: [
              { model: Badge },
              { model: User, as: "student" },
              { model: User, as: "recipient" },
            ],
          },
        ],
        group: ["Group.id"],
      });

      res.status(200).json(awards);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  /* getAwardsForStudent: async (req, res) => {
    const student = req.user;

    try {
      const badges = await Badge.findAll({
        include: [
          {
            model: Award,
            where: {
              [Op.or]: [{ student: student }, { recipient: student }],
            },
          },
        ],
        group: ["Badge.id"],
      });

      res.status(200).json(badges);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  }, */

  getBadgesStudentForHomepage: async (req, res) => {
    const student = req.user;

    try {
      const awards = await Award.findAll({
        where: {
          [Op.or]: [{ student }, { recipient: student }],
        },
        include: [
          {
            model: Badge,
            attributes: ["name"], // Get only the name of the Badge
          },
          {
            model: User,
            as: "giver", // Assuming 'giver' is defined as an alias in your model
            attributes: ["name"], // Get only the name of the giver
          },
          {
            model: User,
            as: "recipient", // Assuming 'recipient' is defined as an alias in your model
            attributes: ["name"], // Get only the name of the recipient
          },
          {
            model: Group,
            attributes: ["number"], // Get only the group number
            include: [
              {
                model: Assignment,
                attributes: ["title"], // Get only the title of the assignment
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      // Transform the result to extract the required fields
      const result = awards.map((award) => ({
        badge: award.Badge.name,
        giver: award.giver.name,
        recipient: award.recipient.name,
        groupNumber: award.Group.number, // Accessing the first group number
        assignmentTitle: award.Group.Assignment.title, // Accessing the title of the first assignment
      }));

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getBadgesTeacherForHomepage: async (req, res) => {
    const teacher = req.user;

    try {
      const awards = await Award.findAll({
        include: [
          {
            model: Group,
            attributes: [], // You can keep this empty since you only want class details later
            include: [
              {
                model: Classe,
                attributes: ["id"], // Include any relevant attributes from Classe if needed
                where: { teacher }, // Filter by teacher here
              },
              {
                model: Assignment,
                attributes: ["title"], // Get the title of the assignment
              },
            ],
          },
          {
            model: Badge,
            attributes: ["name"], // Get only the name of the Badge
          },
          {
            model: User,
            as: "giverUser", // Alias for the giver
            attributes: ["name"], // Get only the name of the giver
          },
          {
            model: User,
            as: "recipientUser", // Alias for the recipient
            attributes: ["name"], // Get only the name of the recipient
          },
        ],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      // Transform the result to extract the required fields
      const result = awards.map((award) => ({
        badge: award.Badge.name,
        giver: award.giver.name,
        recipient: award.recipient.name,
        groupNumber: award.Group.number, // Accessing the group number
        assignmentTitle: award.Group.Assignment?.title, // Accessing the assignment title
      }));

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" }); // Use a generic error message for security
    }
  },

  getUnawardedBadges: async (req, res) => {
    const { group } = req.params;

    try {
      const unawardedBadges = Badge.findAll({
        where: {
          id: {
            [Op.notIn]: Sequelize.literal(`(
                SELECT badge FROM Awards WHERE group = ${group}
            )`), // Exclude awarded badges for the group
          },
        },
      });

      res.status(200).json(unawardedBadges);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default AwardController;
