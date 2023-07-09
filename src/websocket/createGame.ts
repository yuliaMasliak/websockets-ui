import { User } from '../models';
import { games } from './variables';

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
