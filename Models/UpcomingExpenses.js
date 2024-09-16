const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const UpcomingExpenses = sequelize.define('UpcomingExpenses', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount_due: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'UpcomingExpenses',
});

UpcomingExpenses.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(UpcomingExpenses, { foreignKey: 'userId' });

module.exports = UpcomingExpenses;
