import { Game, User } from '../models';
import { games, rooms } from './db';

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
  const res = {
    playerId: innerData.idPlayer,
    data: dataToSend
  };
  return res;
}
