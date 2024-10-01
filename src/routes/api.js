const express = require('express');

const router = express.Router();

router.get('/helloJSON', (req, res) => {
  res.status(200).json({
    message: 'Hello there!',
  });
});

router.get('/timeJSON', (req, res) => {
  const currentTime = new Date().toLocaleString();
  res.status(200).json({
    time: currentTime,
  });
});

module.exports = router;
