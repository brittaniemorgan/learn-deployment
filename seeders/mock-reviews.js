'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [
      { eventId: 1, email: "alice.johnson@example.com", rating: 5, text: 'Amazing event! The speakers were fantastic and the organization was top-notch.', date: '2024-09-10T14:30:00Z', createdAt: new Date(), updatedAt: new Date() },
      { eventId: 1, email: "johnB@example.com", rating: 3, text: "The event was okay, but it didn't meet my expectations. The sessions were a bit too long.", date: '2024-09-12T18:00:00Z', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
