'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PurchasedTickets', [
      { id: 1, ticketId: 1, email: "alice.johnson@example.com", quantity: 2, purchaseDate: "2024-08-15T10:30:00Z", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, ticketId: 2, email: "alice.johnson@example.com", quantity: 1, purchaseDate: "2024-08-20T14:45:00Z", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, ticketId: 3, email: "bob.smith@example.com", quantity: 3, purchaseDate: "2024-09-01T09:15:00Z", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, ticketId: 4, email: "charlie.brown@example.com", quantity: 2, purchaseDate: "2024-09-10T16:20:00Z", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, ticketId: 2, email: "charlie.brown@example.com", quantity: 1, purchaseDate: "2024-09-15T11:00:00Z", createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PurchasedTickets', null, {});
  }
};
