import { getCurrentUser, rooms } from './db.js';
import { users } from './db.js';

export function updateExistingRooms(parsedData) {
  rooms.forEach((room) => {
    if (room.roomId === JSON.parse(parsedData.data).indexRoom) {
      room.roomUsers = [...room.roomUsers, users[users.length - 1]];
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
