import { RoomData } from '../models';
import { users } from './variables';
import { rooms } from './db';

export function createNewRoom(parsedData: RoomData, userId: number) {
  const user = users.find((user) => {
    return user.index === userId;
  });
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
