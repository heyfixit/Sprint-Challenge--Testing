const Promise = require('promise');

let gameStore = [ ];

module.exports = {
  insert: newGame => {
    gameStore.push(newGame);
    return Promise.resolve(newGame);
  }
}
