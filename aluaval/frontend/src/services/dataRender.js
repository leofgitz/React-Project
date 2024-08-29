export const AssignmentItem = (assignment) => (
  <div>
    {assignment.title} - Due: {assignment.dueDate}
  </div>
);

export const GroupBadgeItem = (badge) => (
  <div>
    Group: {badge.Group.name} - Badge: {badge.Badge.name} - Recipient: {badge.recipient.name}
  </div>
);

export const EvaluationItem = (evaluation) => (
    <div>
        Group: {evaluation.Group.name} - Evaluation ID: {evaluation.id}
    </div>
)
