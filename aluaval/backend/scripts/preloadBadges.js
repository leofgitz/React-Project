import { Badge } from "../models/index.js";
import { badges } from "../constants.js";

async function preloadBadges() {
  const dbBadges = await Badge.findAll();

  const dbBadgeMap = new Map(dbBadges.map((badge) => [badge.name, badge]));

  for (let dbBadge of dbBadges) {
    const found = badges.find((badge) => badge.name === dbBadge.name);
    if (!found) {
      await Badge.destroy({ where: { id: dbBadge.id } });
      console.log(`Badge "${dbBadge.name}" was deleted from the database.`);
    } else if (found.icon !== dbBadge.icon || found.name !== dbBadge.name) {
      await Badge.update(
        {
          icon: found.icon,
          name: found.name,
        },
        { where: { id: dbBadge.id } }
      );
      console.log(`Updated icon for badge "${dbBadge.name}" in the database.`);
    }
  }

  for (let badge of badges) {
    const exists = dbBadgeMap.has(badge.name);
    if (!exists) {
      await Badge.create(badge);
      console.log(`Added badge "${badge.name}" to database.`);
    }
  }
  console.log("Badges preloaded successfully!");
}

export default preloadBadges;
