const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const TotalNetWorth = sequelize.define('TotalNetWorth', {
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  percentage_change: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'TotalNetWorth',
});

// Association with User
TotalNetWorth.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(TotalNetWorth, { foreignKey: 'userId' });

module.exports = TotalNetWorth;
