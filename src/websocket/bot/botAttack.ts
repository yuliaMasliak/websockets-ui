import { handleShootStatus } from '../handleShootStatus';
import { placedShips } from '../variables';
import { isSingleGame } from './botClass';

export function botAttak(competitorId: number) {
  const competitorShips = placedShips.find((playerShips) => {
    return playerShips.id === competitorId;
  });
  let innerData = {
    position: {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10)
    },
    currentPlayer: isSingleGame.id,
    status: handleShootStatus(competitorId, competitorShips?.ships!)
  };

  const newAttack = {
    type: 'attack',
    data: JSON.stringify(innerData),
    id: 0
  };
  //   console.log('from botattack' + competitorId);
  //   console.log(innerData);
  const dataToSend = JSON.stringify(newAttack);
  const res = {
    playerId: competitorId,
    data: dataToSend
  };
  return res;
}
