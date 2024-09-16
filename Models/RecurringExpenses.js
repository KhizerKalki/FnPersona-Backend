const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const RecurringExpenses = sequelize.define('RecurringExpenses', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Name of the recurring expense (e.g., Netflix Subscription)',
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'The amount of the recurring expense',
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'The due date of the recurring expense',
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'The frequency of the recurring expense (e.g., Monthly)',
  },
  participants: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Participants contributing to the expense (JSON data)',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Assuming the User model exists
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'RecurringExpenses',
});

// Association with User
RecurringExpenses.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(RecurringExpenses, { foreignKey: 'userId' });

module.exports = RecurringExpenses;
