import { Position } from '../models';

export function getNeighbourCells(ship: Position[]) {
  const neighbours = [];

  for (const pos of ship) {
    const { x, y } = pos;

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i !== x || j !== y) {
          if (i >= 0 && i <= 9 && j >= 0 && j <= 9) {
            if (!ship.some((pos) => pos.x === i && pos.y === j)) {
              neighbours.push({ x: i, y: j });
            }
          }
        }
      }
    }
  }
  // Remove ship cells from neighbours
  const uniqueNeighbours = neighbours.filter(({ x, y }) => {
    return !ship.some((pos) => pos.x === x && pos.y === y);
  });

  return uniqueNeighbours;
}
