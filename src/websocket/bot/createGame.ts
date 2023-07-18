import { games } from '../variables';

export function createGameWithBot(userId: number) {
  const innerData = {
    idGame: games.length,
    idPlayer: userId
  };

  const newGame = {
    type: 'create_game',
    data: JSON.stringify(innerData),
    id: 0
  };

  let dataToSend = JSON.stringify(newGame);
  const res = {
    playerId: innerData.idPlayer,
    data: dataToSend
  };
  return res;
}
