import { placedShips, setTurnUserId, turnUserId } from '../variables';

export function changeTurnWithBot(id: number) {
  setTurnUserId(id);

  const innerData = {
    currentPlayer: turnUserId
  };

  const newTurn = {
    type: 'turn',
    data: JSON.stringify(innerData),
    id: 0
  };

  const dataToSend = JSON.stringify(newTurn);
  const res = {
    playerId: turnUserId,
    data: dataToSend
  };

  return res;
}
