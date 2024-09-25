'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('PurchasedTickets', {
      fields: ['ticketId'],
      type: 'foreign key',
      name: 'fk_purchasedTickets_ticketId', 
      references: {
        table: 'Tickets', 
        field: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('PurchasedTickets', 'fk_purchasedTickets_ticketId');
  },
};
