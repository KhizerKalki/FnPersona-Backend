"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "dateOfBirth", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "timezone", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "dateOfBirth");
    await queryInterface.removeColumn("Users", "timezone");
  },
};
