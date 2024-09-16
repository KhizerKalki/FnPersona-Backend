const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Transaction = sequelize.define('Transaction', {
  // Transaction Date
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'Date of the transaction',
  },

  // Transaction Amount
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Amount of the transaction',
  },

  // Transaction Category (Groceries, Dining, Shopping, etc.)
  category: {
    type: DataTypes.ENUM('Groceries', 'Dining', 'Shopping', 'Utilities', 'Rent', 'Other'),
    allowNull: false,
    comment: 'Category of the transaction',
  },

  // Transaction Description
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Description of the transaction',
  },
  
  // User Foreign Key
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    comment: 'References the user who owns this transaction',
  },
}, {
  sequelize,
  modelName: 'Transaction',
  timestamps: true,
});


// Association with User
Transaction.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Transaction, { foreignKey: 'userId' });

module.exports = Transaction;
