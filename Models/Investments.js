const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Investments = sequelize.define('Investments', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Investment account name',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Status of the investment account (Linked/Unlinked)',
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Type of the investment account (e.g., Brokerage, Savings, etc.)',
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
    comment: 'Total amount in the investment account',
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
  modelName: 'Investments',
});

// Association with User
Investments.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Investments, { foreignKey: 'userId' });

module.exports = Investments;
