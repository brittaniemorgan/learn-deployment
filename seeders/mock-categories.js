'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { id: 1, name: "Music", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Art", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: "Sports", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: "Food & Drink", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: "Technology", createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: "Theater", createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: "Workshops", createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: "Charity", createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
