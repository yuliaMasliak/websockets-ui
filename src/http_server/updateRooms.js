import { currentUser, getCurrentUser, rooms } from './db.js';
import { users } from './db.js';

export function updateExistingRooms(parsedData) {
  let addedUser = {};
  users.forEach((user) => {
    if (user.index === currentUser.index) {
      addedUser = user;
    }
  });
  rooms.forEach((room) => {
    if (room.roomId === JSON.parse(parsedData.data).indexRoom) {
      room.roomUsers = [...room.roomUsers, addedUser];
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
