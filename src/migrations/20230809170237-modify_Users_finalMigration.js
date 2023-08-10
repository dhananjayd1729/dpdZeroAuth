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
    await queryInterface.changeColumn(
      'Users',
      'age',
      {
        type: Sequelize.INTEGER,
        validate: {
          min : 1
        }
      }
    );
    await queryInterface.changeColumn(
      'Users',
      'password',
      {
        type: Sequelize.STRING,
        validate: {
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        },
        allowNull: false
      }
    );
    await queryInterface.changeColumn(
      'Users',
      'gender',
      {
        type: Sequelize.ENUM,
        values: ["male", "female", "non-binary"],
        allowNull: false
      }
    );
    await queryInterface.changeColumn(
      'Users',
      'username',
      {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
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
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'username');
  }
};
