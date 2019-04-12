const Promise = require('promise');

let gameStore = [ ];
let lastId = 0;

const generateId = () => {
  lastId = lastId + 1;
  return lastId;
};

module.exports = {

  insert: newGame => {
    newGame.id = generateId();
    gameStore.push(newGame);
    return Promise.resolve(newGame);
  },

  get: () => Promise.resolve(gameStore),

  truncate: () => {
    lastId = 0;
    gameStore = [];
    return Promise.resolve();
  }
}
