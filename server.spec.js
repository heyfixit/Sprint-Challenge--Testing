const request = require('supertest');
const server = require('./index');

describe('POST /games', () => {
  const newGame = {
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
  };

  it('should respond with 422 if information is incomplete', async () => {
    const response = request(server).post('/games').send({ genre: 'Arcade' });

    expect(response.status).toBe(422);
  });

  it('should respond with 201 if information is valid', async () => {
    const response = request(server).post('/games').send(newGame);

    expect(response.status).toBe(201);
  });

  it('should respond with created game if information is valid', async () => {
    const response = request(server).post('/games').send(newGame);

    expect(response.body).toEqual(newGame);
  });
});
