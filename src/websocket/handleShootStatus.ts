import { Position } from '../models';
import { getNeighbourCells } from './getNeighbourCells';
import { isKilledShip } from './isKilled';
import { allShipsData, setCurrentShootStatus } from './variables';

export function handleShootStatus(
  competitorId: number,
  shotPosition: Position
): string {
  let result = 'miss';
  const competitorShips = allShipsData.find((el) => el.ownerId == competitorId);

  if (competitorShips) {
    competitorShips.ships.forEach((ship) => {
      ship.forEach((pos: Position, i: number) => {
        if (pos.x === shotPosition.x && pos.y === shotPosition.y) {
          pos.state = 'dead';
          if (
            ship.every((pos: Position) => {
              return pos.state === 'dead';
            })
          ) {
            result = 'killed';
            isKilledShip.setIsKilled(true, ship);
          } else {
            result = 'shot';
          }
        }
      });
    });
  }

  setCurrentShootStatus(result);

  return result;
}
