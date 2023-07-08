import { ShipsData } from '../models';

export function handleStartGame(userShips: ShipsData, i: number) {
  const innerData = {
    ships: userShips.ships,
    currentPlayerIndex: userShips.id
  };
  const startGame = {
    type: 'start_game',
    data: JSON.stringify(innerData),
    id: i
  };

  const dataToSend = JSON.stringify(startGame);
  const res = {
    id: userShips.id,
    data: dataToSend
  };
  return res;
}
