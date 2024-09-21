const express = require("express");
const userSettingsRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserSettings,
  createOrUpdateUserSettings,
  deleteUserSettings,
} = require("../controllers/userSettingsController");

userSettingsRouter.get("/:userId", authMiddleware, getUserSettings);
userSettingsRouter.post("/", authMiddleware, createOrUpdateUserSettings);
userSettingsRouter.delete("/:userId", authMiddleware, deleteUserSettings);

module.exports = userSettingsRouter;
