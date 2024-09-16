const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../database');

class User extends Model {
  async validPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  generateJWT() {
    return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}

User.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hashedPassword);
    },
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
