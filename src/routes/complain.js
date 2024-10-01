const express = require('express');

const router = express.Router();

router.get('/cry', (req, res) => {
  res.send('Waaah!');
});
router.get('/whine', (req, res) => {
  res.send('I want an ice cream!');
});

module.exports = router;
