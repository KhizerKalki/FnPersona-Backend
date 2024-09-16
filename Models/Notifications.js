const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Notification = sequelize.define('Notification', {
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
  status: {
    type: DataTypes.STRING, // on_time, overdue, upcoming
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Notification',
});

// Association with User
Notification.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Notification, { foreignKey: 'userId' });

module.exports = Notification;
