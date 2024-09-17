const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const UserSettings = sequelize.define(
  "UserSettings",
  {
    displayPreferences: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    language: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "English",
    },

    mobileNotifications: {
      type: DataTypes.ENUM("instant", "daily", "weekly"),
      allowNull: false,
      defaultValue: "instant",
    },

    emailNotifications: {
      type: DataTypes.ENUM("instant", "daily", "weekly"),
      allowNull: false,
      defaultValue: "instant",
    },

    pushNotifications: {
      type: DataTypes.ENUM("instant", "daily", "weekly"),
      allowNull: false,
      defaultValue: "instant",
    },

    budgetAlertsMobile: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    goalMilestonesMobile: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    accountIssuesMobile: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    budgetAlertsEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    goalMilestonesEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    accountIssuesEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    budgetAlertsPush: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    goalMilestonesPush: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    accountIssuesPush: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    notifyUnreviewedTransactions: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    dataSharing: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "UserSettings",
    timestamps: true,
  }
);

UserSettings.belongsTo(User, { foreignKey: "userId" });
User.hasOne(UserSettings, { foreignKey: "userId" });

module.exports = UserSettings;
