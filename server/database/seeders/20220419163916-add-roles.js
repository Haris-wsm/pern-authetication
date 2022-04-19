'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let roles = ['admin', 'student', 'teacher'];
    roles = roles.map((role) => ({ role }));

    await queryInterface.bulkInsert('roles', roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
