import { placedShips } from './variables';

export function handleNeighbourCellsOpen(
  position: any,
  i: number,
  userID: number
) {
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
      x: position.x,
      y: position.y
    },
    currentPlayer: userID,
    status: 'miss'
  };

  const newAttack = {
    type: 'attack',
    data: JSON.stringify(innerData),
    id: i
  };

  const dataToSend = JSON.stringify(newAttack);
  const res = {
    playerId: userID,
    data: dataToSend
  };
  return res;
}
