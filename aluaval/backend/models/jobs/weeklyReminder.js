import { Op } from "sequelize";
import {
  Assignment,
  Group,
  Membership,
  Notification,
  Evaluation,
} from "../index.js";

const seconds = 300; // for demo purposes
const mili = 1000;

const weeklyReminder = async () => {
  const currentDate = new Date();
  const assignments = await Assignment.findAll();

  for (const assignment of assignments) {
    const dueDate = new Date(assignment.dueDate);
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the current week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the current week

    const groups = await Group.findAll({
      where: { assignment: assignment.id },
    });

    for (const group of groups) {
      const members = await Membership.findAll({
        where: { group: group.id },
      });

      for (const member of members) {
        // Check for evaluations created in the current week
        const evaluations = await Evaluation.findAll({
          where: {
            group: group.id,
            evaluator: member.student,
            createdAt: {
              [Op.gte]: startOfWeek, // From the start of the week
              [Op.lt]: endOfWeek, // To the end of the week
            },
          },
        });

        // Send reminders if no evaluations were created this week
        if (evaluations.length === 0) {
          await Notification.create({
            user: member.student,
            type: "Evaluation",
            reference: assignment.id,
            message: `Reminder: Please fill out your evaluations for the current week for assignment "${
              assignment.title
            }", due on ${dueDate.toDateString()}.`,
          });
        }

        // Check for self-evaluation
        const selfEvaluation = evaluations.find(
          (e) => e.evaluated === member.student
        );
        if (!selfEvaluation) {
          await Notification.create({
            user: member.student,
            type: "Evaluation",
            reference: assignment.id,
            message: `Reminder: Please complete your self-evaluation for assignment "${
              assignment.title
            }", due on ${dueDate.toDateString()}.`,
          });
        }
      }
    }

    // Final evaluation reminder for the last week before the due date
    if (
      currentDate <= dueDate &&
      currentDate > new Date(dueDate.getTime() - 7)
    ) {
      for (const group of groups) {
        const members = await Membership.findAll({
          where: { group: group.id },
        });

        for (const member of members) {
          const evaluations = await Evaluation.findAll({
            where: {
              group: group.id,
              evaluated: member.student,
            },
          });

          const finalReminderPromises = members.map(
            async (memberToEvaluate) => {
              const existingFinalEvaluation = evaluations.find(
                (e) => e.evaluated === memberToEvaluate.user
              );

              // Check for self-evaluation for the current member
              const selfEvaluation = evaluations.find(
                (e) => e.evaluated === member.student // Check if the current member has evaluated themselves
              );

              // Send reminder if the member hasn't evaluated the memberToEvaluate
              if (!existingFinalEvaluation) {
                await Notification.create({
                  user: member.student,
                  type: "Evaluation",
                  reference: assignment.id,
                  message: `Final Reminder: Your evaluation for "${
                    memberToEvaluate.user.name
                  }" for assignment "${
                    assignment.title
                  }" is due on ${dueDate.toDateString()}. Please complete it as soon as possible.`,
                });
              }

              // Send reminder for self-evaluation if it hasn't been done
              if (!selfEvaluation) {
                await Notification.create({
                  user: member.student,
                  type: "Evaluation",
                  reference: assignment.id,
                  message: `Final Reminder: Please complete your self-evaluation for assignment "${
                    assignment.title
                  }", due on ${dueDate.toDateString()}.`,
                });
              }
            }
          );

          // Wait for all reminders to be processed
          await Promise.all(finalReminderPromises);
        }
      }
    }
  }
};

setInterval(weeklyReminder, seconds * mili);

export default weeklyReminder;
