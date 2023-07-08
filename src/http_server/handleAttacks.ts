import { Position, ShipsData } from '../models';
import { placedShips, turns } from './db';
import { handleShootStatus } from './handleShootStatus';

export function handleAttaks(parsedData: any, userID: number) {
  let competitorsShips: [] = [];
  let competitorsId: number = 0;

  placedShips.forEach((ships, i) => {
    if (ships.id === userID) {
      const copy = [...placedShips];
      copy.splice(i, 1);
      competitorsShips = copy[0].ships;
      competitorsId = copy[0].id;
      console.log(competitorsShips);
    }
  });

  const innerData = {
    position: {
      x: JSON.parse(parsedData.data).x,
      y: JSON.parse(parsedData.data).y
    },
    currentPlayerIndex: userID,
    status: handleShootStatus(parsedData, competitorsShips)
  };
  const newAttack = {
    type: 'attack',
    data: JSON.stringify(innerData),
    id: parsedData.id
  };
  turns.push(parsedData.id);

  const dataToSend = JSON.stringify(newAttack);
  const res = {
    id: competitorsId,
    data: dataToSend
  };
  return res;
}
