import { Room, User, ShipsData, Game } from '../models';

export const users: User[] = [];
export const rooms: Room[] = [];
export const placedShips: ShipsData[] = [];
export const usersCountInTheRoom = [];

export let startGame = false;

export const games: Game[] = [];
export const turns: number[] = [];
export const allShipsData: {
  ownerId: number;
  ships: any[];
}[] = [];
