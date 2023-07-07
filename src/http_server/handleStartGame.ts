import { ShipsData } from '../models';

export function handleStartGame(userShips: ShipsData, i: number) {
  const innerData = {
    ships: JSON.parse(userShips.data.data).ships,
    currentPlayerIndex: userShips.id
  };
  const startGame = {
    type: 'start_game',
    data: JSON.stringify(innerData),
    id: i
  };

  const dataToSend = JSON.stringify(startGame);

  return dataToSend;
}
