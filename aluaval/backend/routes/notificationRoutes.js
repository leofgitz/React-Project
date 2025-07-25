import express from "express";
const notificationRouter = express.Router();
import NotificationController from "../controllers/notificationController.js";

notificationRouter.get(
  "/three",
  NotificationController.getFirstThreeNotifications
);

notificationRouter.get("/:type?", NotificationController.getAllNotifications);
notificationRouter.patch("/:id", NotificationController.markAsRead);
notificationRouter.delete(":id", NotificationController.deleteNotification);
notificationRouter.patch("/", NotificationController.markAllAsRead);
notificationRouter.get("/types", NotificationController.getTypes);

export default notificationRouter;
