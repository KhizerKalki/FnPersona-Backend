const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const FireCalculator = sequelize.define(
  "FireCalculator",
  {
    lifestyleExpenses: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment:
        "The desired annual lifestyle expenses after retirement ($/year)",
    },

    retirementAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "The target retirement age",
    },

    currentSavings: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "The current amount of savings ($)",
    },

    annualSavings: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "The amount saved annually ($/year)",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      comment: "References the user using this FIRE calculator",
    },
  },
  {
    sequelize,
    modelName: "FireCalculator",
    timestamps: true,
  }
);

User.hasOne(FireCalculator, { foreignKey: "userId" });
FireCalculator.belongsTo(User, { foreignKey: "userId" });

module.exports = FireCalculator;
