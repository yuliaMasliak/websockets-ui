import { games } from './db.js';

export function createGame(user, i) {
  const innerData = {
    idGame: games.length,
    idPlayer: user.index
  };
  const newGame = {
    type: 'create_game',
    data: JSON.stringify(innerData),
    id: i
  };

  let dataToSend = JSON.stringify(newGame);
  return dataToSend;
}
