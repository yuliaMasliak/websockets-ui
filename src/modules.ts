export type User = {
  name: string;
  index: number;
};
export type Room = {
  roomId: number;
  roomUsers: [] | User[];
};

export type UserData = {
  type: string;
  data: string;
  id: number;
};
export type RoomData = {
  type: string;
  data: string;
  id: number;
};
