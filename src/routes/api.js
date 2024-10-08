const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const generateNewId = () => crypto.randomUUID();

const hoots = [{
  id: generateNewId(),
  content: "Let's Rock!",
  createdAt: new Date(),
}];

router.get('/hoots', (req, res) => res.json(hoots));

router.post('/addHoot', (req, res) => {
  console.log('req.body=', req.body);

  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Content is required.' });
  }

  const newHoot = {
    id: generateNewId(),
    content: content.trim(),
    createdAt: new Date(),
  };

  hoots.push(newHoot);

  console.log('New Hoot Added:', newHoot);

  return res.status(201).json(newHoot);
});

router.get('/helloJSON', (req, res) => res.status(200).json({
  message: 'Hello there!',
}));

router.get('/timeJSON', (req, res) => {
  const currentTime = new Date().toLocaleString();
  return res.status(200).json({
    time: currentTime,
  });
});

// DELETE
const getHootById = (id) => {
  const hoot = hoots.find((h) => h.id === id);
  return hoot;
};

const deleteHootById = (id) => {
  const hoot = getHootById(id);
  if (!hoot) return null;
  const index = hoots.indexOf(hoot);
  hoots.splice(index, 1);
  return hoot;
};

router.delete('/deleteHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = deleteHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    return res.status(404).send({ error });
  }
  return res.json(hoot);
});

router.put('/updateHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    return res.status(404).send({ error });
  }
  if (!req.body || !req.body.content) {
    const error = 'No req.body or req.body content found!';
    return res.status(400).send({ error });
  }
  hoot.content = req.body.content.trim();
  hoot.updatedAt = new Date();
  return res.status(200).json(hoot);
});

router.get('/hoots/:id([0-9a-fA-F-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    return res.status(404).json({ error: `Hoot with id '${req.params.id}' not found` });
  }
  return res.status(200).json(hoot);
});

module.exports = router;
