const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const BudgetOverview = sequelize.define('BudgetOverview', {
  // Total Income
  totalIncome: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
    comment: 'Total income for the user',
  },
  
  // Total Expense
  totalExpense: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
    comment: 'Total expense for the user',
  },

  // Remaining Budget
  remainingBudget: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
    comment: 'Remaining budget after expenses',
  },

  // Budget Overview Metrics
  current_budget: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'The user’s current budget value',
  },

  budget_change_percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'The percentage change in the budget',
  },

  // Overall Budget Distribution (as a JSON object for the chart)
  overallBudgetDistribution: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Overall budget distribution over a period (could store chart data as JSON)',
  },

  // Expenses Breakdown (as a JSON object for the chart)
  expensesBreakdown: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Expenses breakdown over a period (could store chart data as JSON)',
  },

  // Spending vs Budget Data (as a JSON object)
  spendingVsBudget: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Data for the spending vs budget chart (could be a JSON object)',
  },

  // Notifications for payments (due dates for bills, upcoming payments)
  notifications: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Notifications like bills due, credit card payments, upcoming rent, etc.',
  },

  // Date Fields for Budgeting and Financial Reporting
  dateRangeStart: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Start date for budget period',
  },

  dateRangeEnd: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'End date for budget period',
  },

  // Progress on New Users or Custom Metrics
  newUserGrowthPercentage: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Percentage of new user growth for this period',
  },

  goalStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Status if user is below or above financial goal',
  },

}, {
  sequelize,
  modelName: 'BudgetOverview',
});

// Association with User
BudgetOverview.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(BudgetOverview, { foreignKey: 'userId' });

module.exports = BudgetOverview;
