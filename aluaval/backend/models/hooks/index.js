import badgeHooks from "./award.js";
import evaluationHooks from "./evaluation.js";
import groupHooks from "./group.js";
import membershipHooks from "./membership.js";

const applyHooks = () => {
  badgeHooks();
  evaluationHooks();
  groupHooks();
  membershipHooks();
};

export default applyHooks;
