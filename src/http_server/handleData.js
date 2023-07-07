import { handleUsers } from './handleUsers.js';
import { updateExistingRooms } from './updateRooms.js';
import { handleAddingShips } from './handleShips.js';
import { createNewRoom } from './createNewRoom.js';
import { handleAttaks } from './handleAttacks.js';
import { createGame } from './createGame.js';
import { rooms, games } from './db.js';

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
      returnedData.push(createNewRoom(parsedData));
      return returnedData;
    case 'add_user_to_room':
      returnedData.length = 0;
      returnedData.push(updateExistingRooms(parsedData));
      rooms.forEach((room) => {
        if (room.roomUsers.length === 2) {
          games.push(room.length);
          console.log(room);
          room.roomUsers.forEach((user, i) => {
            console.log(user);
            const startGame = createGame(user, i);
            returnedData.push(startGame);
          });
        }
      });

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
