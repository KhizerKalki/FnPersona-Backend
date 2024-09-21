const express = require("express");
const notificationRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const notificationController = require("../controllers/notificationController");

notificationRouter.get(
  "/:userId",
  authMiddleware,
  notificationController.getNotificationsByUserId
);
notificationRouter.post(
  "/",
  authMiddleware,
  notificationController.createNotification
);
notificationRouter.put(
  "/:id",
  authMiddleware,
  notificationController.updateNotification
);
notificationRouter.delete(
  "/:id",
  authMiddleware,
  notificationController.deleteNotification
);

module.exports = notificationRouter;
