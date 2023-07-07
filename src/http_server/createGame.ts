import { User } from '../models';
import { games } from './db';

export function createGame(user: User, i: number) {
  const innerData = {
    idGame: games.length,
    idPlayer: user.index
  };
  console.log(innerData);

  const newGame = {
    type: 'create_game',
    data: JSON.stringify(innerData),
    id: i
  };

  let dataToSend = JSON.stringify(newGame);
  return dataToSend;
}
