import { Assignment, Notification, Group, Membership, User } from "../index.js";

const membershipHooks = () => {
  Membership.afterCreate(async (membership, options) => {
    const group = await Group.findByPk(membership.group);

    if (group) {
      const assignment = await Assignment.findByPk(group.assignment);

      const user = await User.findByPk(membership.student, {
        attributes: ["id"],
      });

      if (user) {
        await Notification.create({
          user: user.id,
          type: "Assignment",
          reference: group.assignment,
          message: `The assignment ${assignment.title} has been created, and you've been assigned to group ${group.number}.`,
        });
      }
    }
  });
};

export default membershipHooks;
