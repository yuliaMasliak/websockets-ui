import { rooms } from './db.js';

export function createNewRoom(parsedData) {
  const newRoom = {
    roomId: rooms.length + 1,
    roomUsers: []
  };
  rooms.push(newRoom);

  const updatedRooms = {
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: parsedData.id
  };

  const dataToSend = JSON.stringify(updatedRooms);
  return dataToSend;
}
