import { handleUsers } from './handleUsers';
import { updateExistingRooms } from './updateRooms';
import { handleAddingShips } from './handleShips';
import { createNewRoom } from './createNewRoom';
import { handleAttaks } from './handleAttacks';
import { createGame } from './createGame';
import { rooms, games } from './db';
import { User, UserData } from '../modules';

export function handleData(data: string, userID: number) {
  const parsedData: any = JSON.parse(data);
  let returnedData = [];
  switch (parsedData.type) {
    case 'create_room' || 'single_play':
      returnedData.length = 0;
      returnedData.push(createNewRoom(parsedData, userID));
      return returnedData;
    case 'add_user_to_room':
      returnedData.length = 0;
      returnedData.push(updateExistingRooms(parsedData, userID));
      rooms.forEach((room) => {
        if (room.roomUsers.length === 2) {
          games.push(room.roomUsers.length);
          room.roomUsers.forEach((user, i) => {
            returnedData.push(createGame(user, i));
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
