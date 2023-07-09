import { rooms } from './db';

export function clearRooms() {
  const updatedRoom = {
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: 0
  };

  const dataToSend = JSON.stringify(updatedRoom);
  return dataToSend;
}
