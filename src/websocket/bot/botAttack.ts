import { handleShootStatus } from '../handleShootStatus';
import { placedShips } from '../variables';
import { isSingleGame } from './botClass';

export function botAttak(competitorId: number) {
  const xPosition = Math.floor(Math.random() * 10);
  const yPosition = Math.floor(Math.random() * 10);
  const position = { x: xPosition, y: yPosition, state: 'alive' };
  let innerData = {
    position: {
      x: xPosition,
      y: yPosition
    },
    currentPlayer: isSingleGame.id,
    status: handleShootStatus(competitorId, position)
  };

  const newAttack = {
    type: 'attack',
    data: JSON.stringify(innerData),
    id: 0
  };

  const dataToSend = JSON.stringify(newAttack);

  const res = {
    playerId: competitorId,
    data: dataToSend
  };
  return dataToSend;
}
