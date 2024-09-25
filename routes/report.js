const express = require('express');
const { Event, Ticket, PurchasedTicket, User, Review } = require('../models');
const router = express.Router();
const { Sequelize } = require('sequelize');

router.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const report = await generateEventReport(eventId);
    res.status(200).json(report);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function generateEventReport(eventId) {

  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const purchasedTickets = await PurchasedTicket.findAll({
    include: {
      model: Ticket,
      as: 'ticket',
      where: { eventId: eventId } 
    }
  });

  const totalTicketsSold = purchasedTickets.reduce((sum, purchase) => sum + purchase.quantity, 0);
  const totalRevenue = purchasedTickets.reduce((sum, purchase) => sum + (purchase.quantity * purchase.ticket.price), 0);

  const ticketsSoldPerDay = purchasedTickets.reduce((acc, purchase) => {
    const date = purchase.purchaseDate.toISOString().split('T')[0]; 
    acc[date] = (acc[date] || 0) + purchase.quantity; 
    return acc;
  }, {});

  const topUsers = await PurchasedTicket.findAll({
    attributes: [
      'email',
      [Sequelize.fn('SUM', Sequelize.col('quantity'),), 'ticketTotal']
    ],
    include: [{
      model: Ticket,
      as: 'ticket',
      where: { eventId: eventId }
    }],
    group: ['email'],
    order: [[Sequelize.col('ticketTotal'), 'DESC']],
    limit: 5,
  });

  const reviews = await Review.findAll({
    where: { eventId: eventId },
    include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName', 'email'] }]
  });
  const averageRating = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;


  return {
    event: {
      id: eventId,
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
    },
    totalTicketsSold,
    totalRevenue: totalRevenue,
    ticketsSoldPerDay,
    topUsers: topUsers.map(user => ({
      name: ` ${user.firstName} ${user.lastName}`, 
      email: user.email,
      ticketCount: user.dataValues.ticketCount,
    })),
    reviewSummary: {
      averageRating: averageRating,
      totalReviews: reviews.length,
      recentReviews: reviews.slice(0, 5).map(review => ({
        rating: review.rating,
        text: review.text,
        userName: ` ${review.User.firstName} ${review.User.lastName}`,  
        userEmail: review.User.email 
      }))
    },
  };
}


module.exports = router;
