import { Notification } from "../models/index.js";
const err500 = "Internal Server Error";

const NotificationController = {
  getNotifications: async (req, res) => {
    const { user } = req.user;
    const { type } = req.params;
    const page = parseInt(req.query.p, 10) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
      const notifications = await Notification.findAll({
        where: {  
          user,
          ...(type && { type }), // Only include type if it's provided
        },
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      res.status(200).json(notifications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getFirstThreeNotifications: async (req, res) => {
    try {
      const notifications = await Notification.findAll({
        limit: 3,
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(notifications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  markAsRead: async (req, res) => {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);
    try {
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      notification.isRead = true;
      await notification.save();
      res.status(200).json({ message: "Notification marked as read" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteNotification: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRows = await Notification.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Notification not found" });
      }
      res.status(200).json({ message: "Notification removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  markAllAsRead: async (req, res) => {
    const { user } = req.params;
    try {
      await Notification.update({ isRead: true }, { where: { user } });
      res
        .status(200)
        .json({ message: "All notifications have been marked as read" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getTypes: (req, res) => {
    try {
      const { values } = Notification.getAttributes().type;
      res.status(200).json(values);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default NotificationController;
