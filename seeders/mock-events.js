'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Events', [
      { id: 1, title: "Rock Concert", date: "2024-09-10", location: "Downtown Arena", category: "Music", image: "1.jpeg", organizerId: 6, ticketPrice: 50, status: "Upcoming", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: "Art Exhibition", date: "2024-10-01", location: "City Gallery", category: "Art", image: "2.jpeg", organizerId: 7, ticketPrice: 15, status: "Upcoming", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, title: "Food Festival", date: "2024-09-22", location: "Central Park", category: "Food & Drink", image: "3.jpeg", organizerId: 6, ticketPrice: 25, status: "Upcoming", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, title: "Tech Conference", date: "2024-11-05", location: "Convention Center", category: "Technology", organizerId: 7, ticketPrice: 100, status: "Upcoming", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, title: "Comedy Night", date: "2024-09-30", location: "Laugh Lounge", category: "Theater", organizerId: 6, ticketPrice: 30, status: "Upcoming", createdAt: new Date(), updatedAt: new Date() },
      { id: 6, title: "Film Screening", date: "2024-10-10", location: "Movie House", category: "Art", organizerId: 7, ticketPrice: 20, status: "Cancelled", createdAt: new Date(), updatedAt: new Date() },
      { id: 7, title: "Yoga Workshop", date: "2024-09-28", location: "Wellness Studio", category: "Workshops", organizerId: 6, ticketPrice: 40, status: "Sold Out", createdAt: new Date(), updatedAt: new Date() },
      { id: 8, title: "Charity Run", date: "2024-10-15", location: "City Stadium", category: "Charity", organizerId: 7, ticketPrice: 35, status: "Upcoming", createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
