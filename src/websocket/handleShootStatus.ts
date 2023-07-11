import { Position } from '../models';
import { allShipsData, setCurrentShootStatus } from './variables';

export function handleShootStatus(
  competitorId: number,
  shotPosition: Position
): string {
  let result = 'missed';
  const competotrShips = allShipsData.find((el) => el.ownerId == competitorId);
  if (competotrShips) {
    competotrShips.ships.forEach((ship) => {
      ship.forEach((pos: Position, i: number) => {
        if (pos.x === shotPosition.x && pos.y === shotPosition.y) {
          ship.splice(i, 1);
          if (ship.length === 0) {
            result = 'killed';
          } else if (ship.length !== 0) {
            result = 'shoot';
          }
        }
      });
    });
  }

  setCurrentShootStatus(result);

  return result;
}
