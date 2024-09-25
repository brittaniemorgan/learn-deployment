const express = require('express');
const { Event } = require('../models'); 
const authenticateToken = require('../middleware/authMiddleware');
const emailService = require('../services/emailService');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, date, location, status } = req.body;
    const [updated] = await Event.update({ title, date, location, status }, { where: { id: req.params.id } });
    if (updated) {
      const updatedEvent = await Event.findByPk(req.params.id);
      emailService.sendEventUpdateEmail(updatedEvent, req.body);
      res.json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Event.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
