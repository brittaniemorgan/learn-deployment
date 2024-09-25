const express = require('express');
const { Review } = require('../models'); 

const router = express.Router();


router.get('/:eventId', async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { eventId: req.params.eventId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { eventId, email, rating, text } = req.body;
    const newReview = await Review.create({ eventId, email, rating, text });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
