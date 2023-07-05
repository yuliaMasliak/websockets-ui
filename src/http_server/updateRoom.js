import { rooms } from './db.js';
import { users } from './db.js';

export function updateRooms(parsedData) {
  const userData = [];
  users.forEach((user, i) => {
    const data = {
      name: user.name,
      index: i
    };
    userData.push(data);
  });

  const rommsArrayData = [];
  rooms.forEach((room) => {
    let roomsData = {
      roomId: userData
    };

    rommsArrayData.push(roomsData);
  });

  const updatedRoom = {
    type: 'update_room',
    data: JSON.stringify(rommsArrayData),
    id: parsedData.id
  };
  const dataToSend = JSON.stringify(updatedRoom);
  return dataToSend;
}
