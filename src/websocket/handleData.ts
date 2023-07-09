import { updateExistingRooms } from './updateRooms';
import { handleStartGame } from './handleStartGame';
import { createNewRoom } from './createNewRoom';
import { handleAttaks } from './handleAttacks';
import { createGame } from './createGame';
import {
  rooms,
  games,
  placedShips,
  allShipsData,
  currentShootStatus,
  turnUserId
} from './db';
import { handleTurn } from './handleTurn';
import { Game } from '../models';
import { createShipsData } from './createShipsData';
import { handleWinner } from './handleWinner';
import { clearRooms } from './clearRoom';

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
          const game: Game = {
            gameId: room.roomId,
            users: room.roomUsers
          };
          games.push(game);
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
        ships: JSON.parse(parsedData.data).ships
      };
      placedShips.push(userShips);
      allShipsData.push(createShipsData(userShips));

      if (placedShips.length === 2) {
        placedShips.forEach((userPlacedShips: any, i: number) => {
          returnedData.push(handleStartGame(userPlacedShips, i));
        });
        returnedData.push(handleTurn(parsedData));
      }
      return returnedData;
    case 'attack':
      returnedData.length = 0;
      if (turnUserId === userID) {
        returnedData.push(handleAttaks(parsedData, userID));
        if (currentShootStatus === 'missed') {
          returnedData.push(handleTurn(parsedData));
        }
      }
      allShipsData.forEach((player, i) => {
        if (
          player.ships.every((ship) => {
            return ship.length === 0;
          })
        ) {
          allShipsData.splice(i, 1);
          returnedData.push(handleWinner(allShipsData[0].ownerId));
          rooms.length = 0;
          returnedData.push(clearRooms());
        }
      });

      return returnedData;

    case 'randomAttack':
      returnedData.length = 0;
      returnedData.push(handleAttaks(parsedData, userID));

      if (currentShootStatus === 'missed') {
        returnedData.push(handleTurn(parsedData));
      }
      return returnedData;
    default:
      break;
  }
}
