import { setTurnUserId } from '../variables';

export function handleFirstTurnWithBot(userId: any) {
  setTurnUserId(userId);

  const innerData = {
    currentPlayer: userId
  };

  const newTurn = {
    type: 'turn',
    data: JSON.stringify(innerData),
    id: 0
  };

  const dataToSend = JSON.stringify(newTurn);

  return dataToSend;
}
