const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const AssetsLiabilities = sequelize.define('AssetsLiabilities', {
  assets_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  liabilities_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  assets_percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  liabilities_percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'AssetsLiabilities',
});

AssetsLiabilities.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(AssetsLiabilities, { foreignKey: 'userId' });

module.exports = AssetsLiabilities;
