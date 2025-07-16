import { Award, Notification, Group, User, Badge } from "../index.js";

const badgeHooks = () => {
  Award.afterCreate(async (award, options) => {
    try {
      const group = await Group.findByPk(award.group);

      const badge = await Badge.findByPk(award.badge);

      if (group) {
        const giver = await User.findByPk(award.giver, {
          attributes: ["id", "name"],
        });

        const recipient = await User.findByPk(award.recipient, {
          attributes: ["id"],
        });

        if (giver && recipient) {
          await Notification.create({
            user: recipient.id,
            type: "Badge",
            reference: award.id,
            message: `You have received the badge: ${badge.name}, awarded by ${giver.name}.`,
          });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

export default badgeHooks;
