const UserSettings = require("../Models/UserSettings");

const getUserSettings = async (req, res) => {
  try {
    const userSettings = await UserSettings.findOne({
      where: { userId: req.params.userId },
    });
    if (userSettings) {
      res.status(200).json(userSettings);
    } else {
      res.status(404).json({ error: "User settings not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve user settings",
      details: error,
    });
  }
};

const createOrUpdateUserSettings = async (req, res) => {
  try {
    const {
      displayPreferences,
      language,
      mobileNotifications,
      emailNotifications,
      pushNotifications,
      budgetAlertsMobile,
      goalMilestonesMobile,
      accountIssuesMobile,
      budgetAlertsEmail,
      goalMilestonesEmail,
      accountIssuesEmail,
      budgetAlertsPush,
      goalMilestonesPush,
      accountIssuesPush,
      notifyUnreviewedTransactions,
      dataSharing,
      userId,
    } = req.body;

    const existingSettings = await UserSettings.findOne({ where: { userId } });

    if (existingSettings) {
      const updatedSettings = await UserSettings.update(req.body, {
        where: { userId },
      });
      res.status(200).json(updatedSettings);
    } else {
      const newSettings = await UserSettings.create({
        displayPreferences,
        language,
        mobileNotifications,
        emailNotifications,
        pushNotifications,
        budgetAlertsMobile,
        goalMilestonesMobile,
        accountIssuesMobile,
        budgetAlertsEmail,
        goalMilestonesEmail,
        accountIssuesEmail,
        budgetAlertsPush,
        goalMilestonesPush,
        accountIssuesPush,
        notifyUnreviewedTransactions,
        dataSharing,
        userId,
      });
      res.status(201).json(newSettings);
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to create or update user settings",
      details: error,
    });
  }
};

const deleteUserSettings = async (req, res) => {
  try {
    const deleted = await UserSettings.destroy({
      where: { userId: req.params.userId },
    });
    res.status(200).json({
      message: "User settings deleted successfully",
      count: deleted,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete user settings",
      details: error,
    });
  }
};

module.exports = {
  getUserSettings,
  createOrUpdateUserSettings,
  deleteUserSettings,
};
