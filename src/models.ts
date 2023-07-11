import { WebSocket } from 'ws';

export type User = {
  name: string;

  index: number;
};
export type UserInDB = {
  name: string;
  password: string;
  index: number;
  wins: number;
};
export type Room = {
  roomId: number;
  roomUsers: [] | User[];
};
export type Game = {
  gameId: number;
  users: [] | User[];
};
export type UserData = {
  type: string;
  data: string;
  id: number;
};
export type ShipsData = {
  id: number;
  ships: any;
};
export type RoomData = {
  type: string;
  data: string;
  id: number;
};
export type Connection = WebSocket & { userID: number };
export type Position = {
  state: string;
  x: number;
  y: number;
};
