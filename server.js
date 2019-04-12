const express = require('express');
const server = express();

const Games = require('./memoryGames');

server.use(express.json());

server.post('/games', async ({ body: newGame }, res) => {
  if (!(newGame.title && newGame.genre)) {
    return res.status(422).json({ message: 'Title and Genre required' });
  }

  try {
    const createdGame = await Games.insert(newGame);
    return res.status(201).json(createdGame);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

server.get('/games', async (req, res) => {
  const games = await Games.get();
  return res.status(200).json(games);
});

module.exports = server;
