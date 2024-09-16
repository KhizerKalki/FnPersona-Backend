const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const UserGrowth = sequelize.define('UserGrowth', {
  new_users_percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  goal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  current_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'UserGrowth',
});

UserGrowth.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(UserGrowth, { foreignKey: 'userId' });

module.exports = UserGrowth;
