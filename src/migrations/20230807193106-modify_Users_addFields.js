'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'Users',
      'username',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
    await queryInterface.addColumn(
      'Users',
      'full_name',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
    await queryInterface.addColumn(
      'Users',
      'gender',
      {
        type: Sequelize.ENUM,
        values: ["Male", "Female"]
      }
    );
    await queryInterface.addColumn(
      'Users',
      'age',
      {
        type: Sequelize.INTEGER,
        max : 120,
        min : 1
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'age');
    await queryInterface.removeColumn('Users', 'gender');
    await queryInterface.removeColumn('Users', 'username');
    await queryInterface.removeColumn('Users', 'full_name');
  }
};
