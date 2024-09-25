const express = require('express');
const qrcode = require('qrcode');
const { Ticket } = require('../models'); 
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

async function generateQRCode(data) {
  try {
    return await qrcode.toDataURL(JSON.stringify(data));
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

router.post('/', async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);
    const qrCodeDataURL = await generateQRCode({
      id: newTicket.id,
      ticketType: newTicket.ticketType,
      eventId: newTicket.eventId
    });    
    newTicket.qrCode = qrCodeDataURL;
    await newTicket.save()
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({ where: { eventId: req.query.eventId } });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const [updated] = await Ticket.update( req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedTicket = await Ticket.findByPk(req.params.id);
      res.json(updatedTicket);
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Ticket.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
