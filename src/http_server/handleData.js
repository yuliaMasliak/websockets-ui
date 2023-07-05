import { handleUsers } from './handleUsers.js';
import { handleRooms, handleSingleRoomPlay } from './handleRooms.js';
import { handleAddingShips } from './handleShips.js';
import { handleAttaks } from './handleAttacks.js';
import { updateRooms } from './updateRoom.js';
import { rooms } from './db.js';

export function handleData(data) {
  const parsedData = JSON.parse(data);
  let returnedData = [];
  switch (parsedData.type) {
    case 'reg':
      returnedData.length = 0;
      returnedData.push(handleUsers(parsedData));
      return returnedData;
    case 'create_room' || 'single_play':
      returnedData.length = 0;
      returnedData.push(handleRooms(parsedData));
      console.log(rooms);
      returnedData.push(handleRooms(updateRooms(parsedData)));
      return returnedData;
    case 'single_play':
      returnedData.length = 0;
      returnedData.push(handleSingleRoomPlay(parsedData));
      returnedData.push(handleRooms(updateRooms(parsedData)));
      return returnedData;
    case 'add_ships':
      returnedData.length = 0;
      returnedData.push(handleAddingShips(parsedData));
      return returnedData;
    case 'attack':
      returnedData.length = 0;
      returnedData.push(handleAttaks(parsedData));
      return returnedData;
    default:
      break;
  }
  function clearReturnedData() {}
}
