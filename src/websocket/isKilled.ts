import { Position } from '../models';

class IsKilled {
  isKilled: boolean = false;
  killedShip: Position[] = [];
  setIsKilled(value: boolean, ship: Position[] = []) {
    this.isKilled = value;
    this.killedShip = ship;
  }
  getIsKilled() {
    return this.killedShip;
  }
}
export const isKilledShip = new IsKilled();
