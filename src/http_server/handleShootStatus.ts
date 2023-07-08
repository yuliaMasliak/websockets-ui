import { Position } from '../models';
import { allShipsData, setCurrentShootStatus } from './db';

export function handleShootStatus(
  competitorId: number,
  shotPosition: Position
): string {
  let result = 'missed';
  const competotrShips = allShipsData.find((el) => el.ownerId == competitorId);

  competotrShips!.ships.forEach((position) => {
    position.forEach((pos: Position, i: number) => {
      if (pos.x === shotPosition.x && pos.y === shotPosition.y) {
        position.splice(i, 1);
        result = position.length == 0 ? 'killed' : 'shoot';
      }
    });
  });
  setCurrentShootStatus(result);
  return result;
}
