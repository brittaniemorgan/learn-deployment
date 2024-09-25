'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { id: 1, firstName: "Alice", lastName:"Johnson", email: "alice.johnson@example.com", password: "password123", role: "user", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, firstName: "Bob", lastName:"Smith", email: "bob.smith@example.com", password: "password123", role: "user", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, firstName: "Charlie", lastName:"Brown", email: "charlie.brown@example.com", password: "password123", role: "user", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, firstName: "Diana", lastName:"Prince", email: "diana.prince@example.com", password: "password123", role: "admin", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, firstName: "Evan", lastName:"Williams", email: "evan.williams@example.com", password: "password123", role: "admin", createdAt: new Date(), updatedAt: new Date() },
      { id: 6, firstName: "Sophia", lastName:"Lee", email: "sophia.lee@example.com", password: "password123", role: "organizer", createdAt: new Date(), updatedAt: new Date() },
      { id: 7, firstName: "James", lastName:"Wilson", email: "james.wilson@example.com", password: "password123", role: "organizer", createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
