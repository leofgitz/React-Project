import { Assignment, Enrollment, Group, Notification } from "../index.js";

const groupHooks = () => {
  Group.afterCreate(async (group, options) => {
    if (group.assignment) {
      const assignment = await Assignment.findByPk(group.assignment);

      const enrollments = await Enrollment.findAll({
        where: { classe: group.classe },
        include: {
          model: User,
          where: { role: "Student" },
          attributes: ["id"],
        },
      });

      for (const enrollment of enrollments) {
        let id = enrollment.User.id;

        await Notification.create({
          user: id,
          type: "Assignment",
          reference: group.assignment,
          message: `The assignment ${assignment.title} has been created, and you've been assigned to group ${group.id}`,
        });
      }
    }
  });
};

export default groupHooks;
