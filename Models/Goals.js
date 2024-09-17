const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const Goal = sequelize.define(
  "Goal",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the goal (e.g., "Vacation Fund")',
    },

    targetAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "The total amount the user wants to save for this goal",
    },

    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "The deadline date for achieving the goal",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      comment: "References the user who owns this goal",
    },
  },
  {
    sequelize,
    modelName: "Goal",
    timestamps: true,
  }
);

const Contribution = sequelize.define(
  "Contribution",
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Amount contributed towards the goal",
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      comment: "Date the contribution was made",
    },

    goalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Goals",
        key: "id",
      },
      comment: "References the goal this contribution belongs to",
    },
  },
  {
    sequelize,
    modelName: "Contribution",
    timestamps: true,
  }
);

Goal.hasMany(Contribution, { foreignKey: "goalId", onDelete: "CASCADE" });
Contribution.belongsTo(Goal, { foreignKey: "goalId" });

User.hasMany(Goal, { foreignKey: "userId" });
Goal.belongsTo(User, { foreignKey: "userId" });

module.exports = { Goal, Contribution };
