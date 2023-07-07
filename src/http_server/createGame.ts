import { User } from '../modules';
import { games } from './db';

export function createGame(user: User, i: number) {
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
