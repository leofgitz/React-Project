import { Classe, Notification, Evaluation, Group, User } from "../index.js";

const evaluationHooks = () => {
  Evaluation.afterCreate(async (evaluation, options) => {
    const group = await Group.findByPk(evaluation.group, {
      include: { model: Classe },
    });

    await Notification.create({
      user: group.Classe.teacher,
      type: "Evaluation",
      reference: evaluation.id,
      message: `A new evaluation for the group ${group.number} has been posted.`,
    });

    if (evaluation.evaluated !== evaluation.evaluator) {
      const evaluator = await User.findOne({
        where: { id: evaluation.evaluator },
        attributes: ["name"],
      });

      await Notification.create({
        user: evaluation.evaluated,
        type: "Evaluation",
        reference: evaluation.id,
        message: `You have been evaluated in the group ${group.number} by ${evaluator.name}.`,
      });
    }
  });

  Evaluation.afterUpdate(async (evaluation, options) => {
    const group = await Group.findByPk(evaluation.group, {
      include: { model: Classe },
    });

    await Notification.create({
      user: group.Classe.teacher,
      type: "Evaluation",
      reference: evaluation.id,
      message: `An evaluation for the group ${group.number} has been altered.`,
    });

    if (evaluation.evaluated !== evaluation.evaluator) {
      const evaluator = await User.findOne({
        where: { id: evaluation.evaluator },
        attributes: ["name"],
      });

      await Notification.create({
        user: evaluation.evaluated,
        type: "Evaluation",
        reference: evaluation.id,
        message: `${evaluator.name} altered your evaluation in the group ${group.number}.`,
      });
    }
  });
};

export default evaluationHooks;
