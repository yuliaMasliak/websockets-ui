import { User } from '../models';
import { rooms, users, games } from './db';

export function updateExistingRooms(parsedData: any, userId: number) {
  const user = users.find((user) => user.index === userId);
  rooms.forEach((room) => {
    if (room.roomId === JSON.parse(parsedData.data).indexRoom) {
      if (user) {
        if (user.index !== room.roomUsers[0].index) {
          room.roomUsers = [...room.roomUsers, user];
        }
      }
    }
  });

  const updatedRoom = {
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: parsedData.id
  };

  const dataToSend = JSON.stringify(updatedRoom);
  return dataToSend;
}
