import {
  Assignment,
  Classe,
  Group,
  Membership,
  Notification,
  User,
} from "../index.js";

const groupHooks = () => {

  Group.afterUpdate(async (group, options) => {
    const updatedGroup = await Group.findByPk(updatedGroup.id, {
      include: [
        { model: Membership, include: [User] },
        { model: Assignment },
        { model: Classe, include: [User] },
      ],
    });

    const previousData = group._previousDataValues;

    await notifyAssignmentChange(
      updatedGroup,
      previousData.assignment,
      group.id
    );

    await notifyMemberChanges(
      previousData.Memberships || [],
      updatedGroup.Memberships || [],
      group.id
    );
  });
};

async function notifyAssignmentChange(
  updatedGroup,
  previousAssignment,
  groupId
) {
  if (previousAssignment !== updatedGroup.assignment) {
    const members = updatedGroup.Memberships.map((m) => m.User);
    const teacher = updatedGroup.Classe.User;
    const allUsers = [teacher, ...members];

    for (const user of allUsers) {
      await Notification.create({
        user: user.id,
        type: "Group",
        reference: groupId,
        message: `The assignment for group ${groupId} has been updated to ${updatedGroup.Assignment.title}.`,
      });
    }
  }
}

async function notifyMemberChanges(previousMembers, currentMembers, groupId) {
  const previousMemberIds = previousMembers.map((m) => m.student);
  const currentMemberIds = currentMembers.map((m) => m.student);

  const addedMembers = currentMembers.filter(
    (m) => !previousMemberIds.includes(m.student)
  );

  // Bulk create notifications for added members
  const addedNotifications = addedMembers.map((added) => ({
    user: added.User.id,
    type: "Group",
    reference: groupId,
    message: `You have been added to group ${groupId}.`,
  }));

  await Notification.bulkCreate(addedNotifications);

  const existingMembers = currentMembers.filter((m) =>
    previousMemberIds.includes(m.student)
  );

  // Bulk create notifications for existing members about the new member addition
  const existingNotifications = existingMembers.map((existing) => ({
    user: existing.User.id,
    type: "Group",
    reference: groupId,
    message: `A new member has been added to group ${groupId}.`,
  }));

  await Notification.bulkCreate(existingNotifications);

  const removedMembers = previousMembers.filter(
    (m) => !currentMemberIds.includes(m.student)
  );

  // Bulk create notifications for removed members
  const removedNotifications = removedMembers.map((removed) => ({
    user: removed.User.id,
    type: "Group",
    reference: groupId,
    message: `You have been removed from group ${groupId}.`,
  }));

  await Notification.bulkCreate(removedNotifications);
}

export default groupHooks;
