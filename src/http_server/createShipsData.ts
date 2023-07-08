import { Position, ShipsData } from '../models';

export function createShipsData(ships: ShipsData) {
  let result: any = [];
  const obj = {
    ownerId: ships.id,
    ships: []
  };
  console.log(ships);

  ships.ships.forEach((position: any) => {
    const shipPosititons = [];
    if (position.direction === true) {
      for (let i = 0; i < position.length; i++) {
        const pos = {
          x: position.position.x,
          y: position.position.y + i
        };
        shipPosititons.push(pos);
      }
    }
    if (position.direction === false) {
      for (let i = 0; i < position.length; i++) {
        const pos = {
          x: position.position.x + i,
          y: position.position.y
        };
        shipPosititons.push(pos);
      }
    }
    result.push(shipPosititons);
  });

  obj.ships = result;

  return obj;
}
