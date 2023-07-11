import { placedShips, turns } from './variables';
import { handleShootStatus } from './handleShootStatus';

export function handleAttaks(parsedData: any, userID: number, random: boolean) {
  let competitorId: number = 0;

  placedShips.forEach((ships, i) => {
    if (ships.id === userID) {
      const copy = [...placedShips];
      copy.splice(i, 1);
      competitorId = copy[0].id;
    }
  });
  let innerData = {
    position: {
      x: JSON.parse(parsedData.data).x,
      y: JSON.parse(parsedData.data).y
    },
    currentPlayer: userID,
    status: handleShootStatus(competitorId, JSON.parse(parsedData.data))
  };
  if (random) {
    innerData.position.x = Math.floor(Math.random() * 10);
    innerData.position.y = Math.floor(Math.random() * 10);
  }

  const newAttack = {
    type: 'attack',
    data: JSON.stringify(innerData),
    id: parsedData.id
  };
  turns.push(parsedData.id);

  const dataToSend = JSON.stringify(newAttack);
  const res = {
    playerId: userID,
    data: dataToSend
  };
  return res;
}
