import { Award, Notification, Group, User } from "../index.js";

const badgeHooks = () => {
  Award.afterCreate(async (award, options) => {
    const group = await Group.findByPk(award.group);

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
          message: `You have received the badge: ${award.badge}, awarded by ${giver.name}.`,
        });
      }
    }
  });
};

export default badgeHooks;