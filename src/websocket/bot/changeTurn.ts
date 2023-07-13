import { placedShips, setTurnUserId, turnUserId } from '../variables';

export function changeTurnWithBot(id: number) {
  setTurnUserId(id);

  console.log('from turn currentTurn:' + turnUserId);

  const innerData = {
    currentPlayer: turnUserId
  };

  const newTurn = {
    type: 'turn',
    data: JSON.stringify(innerData),
    id: 0
  };

  const dataToSend = JSON.stringify(newTurn);

  return dataToSend;
}
