import { allShipsData } from './db';

export function handleWinner(winnerID: number) {
  const innerData = {
    winPlayer: winnerID
  };
  const winner = {
    type: 'finish',
    data: JSON.stringify(innerData),
    id: 0
  };
  const dataToSend = JSON.stringify(winner);
  return dataToSend;
}
