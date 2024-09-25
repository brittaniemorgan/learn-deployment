'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tickets', [
      { ticketId: 1, eventId: 1, qrCode: "QR_123456A", ticketType: "general", createdAt: new Date(), updatedAt: new Date() },
      { ticketId: 2, eventId: 1, qrCode: "QR_123456B", ticketType: "vip", createdAt: new Date(), updatedAt: new Date() },
      { ticketId: 3, eventId: 2, qrCode: "QR_123456C", ticketType: "general", createdAt: new Date(), updatedAt: new Date() },
      { ticketId: 2, eventId: 3, qrCode: "QR_123456D", ticketType: "general", createdAt: new Date(), updatedAt: new Date() },
      { ticketId: 2, eventId: 3, qrCode: "QR_123456E", ticketType: "general", createdAt: new Date(), updatedAt: new Date() },
      { ticketId: 4, eventId: 5, qrCode: "QR_123456F", ticketType: "general", createdAt: new Date(), updatedAt: new Date() },
      { ticketId: 5, eventId: 6, qrCode: "QR_123456G", ticketType: "general", createdAt: new Date(), updatedAt: new Date() },
      { ticketId: 6, eventId: 7, qrCode: "QR_123456H", ticketType: "general", createdAt: new Date(), updatedAt: new Date() },
      { ticketId: 7, eventId: 8, qrCode: "QR_123456I", ticketType: "general", createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tickets', null, {});
  }
};
