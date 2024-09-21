const Notification = require("./../Models/Notifications");

const getNotificationsByUserId = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve notifications", details: error });
  }
};

const createNotification = async (req, res) => {
  try {
    const { title, due_date, amount_due, status, userId } = req.body;
    const newNotification = await Notification.create({
      title,
      due_date,
      amount_due,
      status,
      userId,
    });
    res.status(201).json(newNotification);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create notification", details: error });
  }
};

const updateNotification = async (req, res) => {
  try {
    const updatedNotification = await Notification.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedNotification);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update notification", details: error });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.destroy({
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ message: "Notification deleted successfully", count: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete notification", details: error });
  }
};

module.exports = {
  getNotificationsByUserId,
  createNotification,
  updateNotification,
  deleteNotification,
};
