const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const BudgetCategory = sequelize.define(
  "BudgetCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    amountSpent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "BudgetCategory",
  }
);

BudgetCategory.belongsTo(User, { foreignKey: "userId" });
User.hasMany(BudgetCategory, { foreignKey: "userId" });

module.exports = BudgetCategory;
