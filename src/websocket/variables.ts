import { Room, User, ShipsData, Game, Connection } from '../models';

export const users: User[] = [];

export const placedShips: ShipsData[] = [];
export const usersCountInTheRoom = [];
export let connections: Connection[] = [];
export let startGame = false;
export const games: Game[] = [];
export const turns: number[] = [];
export let turnUserId: number;
export const allShipsData: {
  ownerId: number;
  ships: any[];
}[] = [];
export let currentShootStatus = 'missed';
export let connectionCount: number = 0;

export function setCurrentShootStatus(value: string) {
  currentShootStatus = value;
}
export function setTurnUserId(value: number) {
  turnUserId = value;
}
export function setCommectionsCout(value: number) {
  connectionCount = value;
}
