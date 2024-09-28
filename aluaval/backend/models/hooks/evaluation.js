import { Classe, Evaluation, Group, User } from "../index.js";

const evaluationHooks = () => {
  Evaluation.afterCreate(async (evaluation, options) => {
    const group = await Group.findByPk(evaluation.group, {
      include: { model: Classe, include: [User] },
    });

    await Notification.create({
      user: group.Classe.teacher,
      type: "Evaluation",
      reference: evaluation.id,
      message: `A new evaluation for the group ${group.id} has been posted.`,
    });
  });

  Evaluation.afterUpdate();
};

export default evaluationHooks;
