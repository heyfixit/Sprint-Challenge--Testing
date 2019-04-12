const request = require('supertest');
const server = require('./server');
const Games = require('./memoryGames');

const newGame = {
  title: 'Pacman',
  genre: 'Arcade',
  releaseYear: 1980
};

describe('POST /games', () => {
  it('should respond with 422 if information is incomplete', async () => {
    const response = await request(server)
      .post('/games')
      .send({ genre: 'Arcade' });

    expect(response.status).toBe(422);
  });

  it('should respond with 201 if information is valid', async () => {
    const response = await request(server)
      .post('/games')
      .send(newGame);

    expect(response.status).toBe(201);
  });

  it('should respond with created game if information is valid', async () => {
    const response = await request(server)
      .post('/games')
      .send(newGame);

    expect(response.body).toEqual(newGame);
  });
});

describe('GET /games', () => {
  beforeEach(Games.truncate);

  it('should respond with an empty array if no games are stored', async () => {
    const response = await request(server).get('/games');

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should respond with an array of games if games are stored', async () => {
    const { body: createdGame } = await request(server)
      .post('/games')
      .send(newGame);
    const response = await request(server).get('/games');

    expect(response.body).toEqual([createdGame]);
  });

  it('should respond with status code 200', async () => {
    const response = await request(server).get('/games');

    expect(response.status).toBe(200);
  });
});
