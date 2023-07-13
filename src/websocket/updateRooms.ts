import { users } from './variables';
import { rooms } from './db';

export function updateExistingRooms(parsedData: any = '', userId: number = 0) {
  if (parsedData && userId !== 0) {
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
  }

  const updatedRoom = {
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: parsedData.id
  };

  const dataToSend = JSON.stringify(updatedRoom);
  return dataToSend;
}
