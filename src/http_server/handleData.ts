import { updateExistingRooms } from './updateRooms';
import { handleStartGame } from './handleStartGame';
import { createNewRoom } from './createNewRoom';
import { handleAttaks } from './handleAttacks';
import { createGame } from './createGame';
import { rooms, games, placedShips } from './db';

export function handleData(data: string, userID: number) {
  const parsedData: any = JSON.parse(data);
  let returnedData: any = [];

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
      const userShips = {
        id: userID,
        data: parsedData
      };
      placedShips.push(userShips);
      if (placedShips.length === 2) {
        placedShips.forEach((userPlacedShips: any, i: number) => {
          returnedData.push(handleStartGame(userPlacedShips, i));
        });
      }
      return returnedData;
    case 'attack':
      returnedData.length = 0;
      returnedData.push(handleAttaks(parsedData, userID));
      return returnedData;
    default:
      break;
  }
}
