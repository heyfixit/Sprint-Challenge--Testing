const Promise = require('promise');

let gameStore = [ ];
let lastId = 0;

const generateId = () => {
  lastId = lastId + 1;
  return lastId;
};

module.exports = {

  insert: newGame => {
    const foundIndex = gameStore.findIndex(g => g.title === newGame.title);
    if(foundIndex > -1) {
      return Promise.reject(new Error('Title is not unique'));
    }

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
