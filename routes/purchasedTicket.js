const express = require('express');
const { PurchasedTicket, Ticket } = require('../models');
const emailService = require('../services/emailService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newTicket = await PurchasedTicket.create(req.body);
    emailService.sendPurchaseEmail(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { email, eventId } = req.query;
    const whereClause = {};

    if (email) whereClause.email = email;

    const queryOptions = {
      where: whereClause,
      include: [],
    };

    if (eventId) {
      queryOptions.include.push({
        model: Ticket,
        as: 'ticket', 
        required: true, 
        where: { eventId }, 
        attributes: ['id', 'eventId'], 
      });
    }

    const purchasedTickets = await PurchasedTicket.findAll(queryOptions);
    res.json(purchasedTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ticket = await PurchasedTicket.findByPk(req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'PurchasedTicket not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
