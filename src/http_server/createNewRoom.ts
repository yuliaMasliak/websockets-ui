import { RoomData, User } from '../models';
import { rooms, users } from './db';

export function createNewRoom(parsedData: RoomData, userId: number) {
  const user = users.find((user) => user.index === userId);
  if (user) {
    const newRoom = {
      roomId: rooms.length + 1,
      roomUsers: [user]
    };
    rooms.push(newRoom);
  }

  const updatedRooms = {
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: parsedData.id
  };

  const dataToSend = JSON.stringify(updatedRooms);
  return dataToSend;
}
