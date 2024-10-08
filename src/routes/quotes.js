const express = require('express');
const db = require('../db.js');

const router = express.Router();

router.get('/', (req, res) => {
  const { id } = req.query;
  if (id) {
    const quote = db.getQuoteById(id);
    return quote ? res.json(quote) : res.json({});
  }
  return res.json(db.getAllQuotes());
});

router.get('/random', (req, res) => {
  res.json(db.randomQuote());
});

router.get('/recent', (req, res) => {
  res.json(db.recentQuote());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const quote = db.getQuoteById(id);
  return quote ? res.json(quote) : res.json({});
});

module.exports = router;
