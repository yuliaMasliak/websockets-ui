import { updateExistingRooms } from './updateRooms';
import { handleStartGame } from './handleStartGame';
import { createNewRoom } from './createNewRoom';
import { handleAttaks } from './handleAttacks';
import { createGame } from './createGame';
import {
  games,
  placedShips,
  allShipsData,
  currentShootStatus,
  turnUserId,
  setIsRandom,
  getIsRandom,
  users
} from './variables';
import { rooms } from './db';
import { handleTurn } from './handleTurn';
import { Game, Position } from '../models';
import { createShipsData } from './createShipsData';
import { handleWinner } from './handleWinner';
import { clearRooms } from './clearRoom';
import { updateWinners } from './updateWinners';
import { isKilledShip } from './isKilled';
import { getNeighbourCells } from './getNeighbourCells';
import { handleNeighbourCellsOpen } from './handleNeighbourCellsOpen';
import { createGameWithBot } from './bot/createGame';
import { isSingleGame } from './bot/botClass';
import { handleFirstTurnWithBot } from './bot/handleFirstTurn';
import { changeTurnWithBot } from './bot/changeTurn';
import { botAttak } from './bot/botAttack';

import { handleAttaksSinglePlay } from './bot/handleAttacksSingleGame';

export async function handleData(data: string, userID: number) {
  return new Promise((resolve) => {
    const parsedData: any = JSON.parse(data);
    let returnedData: any = [];

    switch (parsedData.type) {
      case 'create_room':
        isSingleGame.setIsSingleGame(false);
        returnedData.length = 0;
        returnedData.push(createNewRoom(parsedData, userID));
        resolve(returnedData);
        break;
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
        resolve(returnedData);
        break;
      case 'add_ships':
        if (!isSingleGame.gettIsSingleGame()) {
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
        } else {
          const botShips = {
            id: isSingleGame.id,
            ships: isSingleGame.ships
          };
          returnedData.length = 0;
          const userShips = {
            id: userID,
            ships: JSON.parse(parsedData.data).ships
          };

          placedShips.push(botShips, userShips);
          allShipsData.push(
            createShipsData(userShips),
            createShipsData(botShips)
          );
          returnedData.push(handleStartGame(userShips, 0));
          returnedData.push(handleFirstTurnWithBot(userID));
        }
        resolve(returnedData);
        break;
      case 'attack':
        console.log(allShipsData.length);
        returnedData.length = 0;
        isKilledShip.setIsKilled(false);
        setIsRandom(false);
        if (!isSingleGame.gettIsSingleGame()) {
          if (turnUserId === userID) {
            returnedData.push(handleAttaks(parsedData, userID, getIsRandom()));
            getNeighbourCells(isKilledShip.getIsKilled()).forEach((pos, i) => {
              returnedData.push(handleNeighbourCellsOpen(pos, i, userID));
            });
            if (currentShootStatus === 'miss') {
              isKilledShip.setIsKilled(false);
              returnedData.push(handleTurn(parsedData));
            }
          }
          checkWinner(returnedData);
          resolve(returnedData);
          break;
        } else if (isSingleGame.gettIsSingleGame()) {
          console.log('bot play');
          setIsRandom(false);
          if (turnUserId !== isSingleGame.id) {
            console.log('not bot turn');

            returnedData.push(
              handleAttaksSinglePlay(parsedData, userID, getIsRandom())
            );

            getNeighbourCells(isKilledShip.getIsKilled()).forEach((pos, i) => {
              returnedData.push(
                handleNeighbourCellsOpen(pos, i, allShipsData[0].ownerId)
              );
            });
            if (currentShootStatus === 'miss') {
              isKilledShip.setIsKilled(false);
              returnedData.push(changeTurnWithBot(isSingleGame.id));
              setTimeout(() => {
                returnedData.push(botAttak(userID));
                resolve(returnedData);
              }, 2000);
            }
          } else {
            console.log('bot turn');
            returnedData.push(botAttak(userID));
            returnedData.push(changeTurnWithBot(userID));
            resolve(returnedData);
          }
        }
        break;
      case 'randomAttack':
        returnedData.length = 0;
        setIsRandom(true);
        isKilledShip.setIsKilled(false);
        returnedData.push(handleAttaks(parsedData, userID, getIsRandom()));

        if (currentShootStatus === 'miss') {
          isKilledShip.setIsKilled(false);
          returnedData.push(handleTurn(parsedData));
        }
        allShipsData.forEach((player, i) => {
          if (
            player.ships.every((ship) => {
              return ship.every((pos: Position) => {
                return pos.state === 'dead';
              });
            })
          ) {
            allShipsData.splice(i, 1);
            updateWinners(allShipsData[0].ownerId);
            returnedData.push(handleWinner(allShipsData[0].ownerId));
            getNeighbourCells(isKilledShip.getIsKilled()).forEach((pos, i) => {
              returnedData.push(
                handleNeighbourCellsOpen(pos, i, allShipsData[0].ownerId)
              );
            });
            rooms.length = 0;
            allShipsData.length = 0;
            returnedData.push(clearRooms());
          }
        });
        resolve(returnedData);
        break;
      case 'single_play':
        returnedData.length = 0;
        isSingleGame.setIsSingleGame(true);
        const bot = {
          name: 'bot',
          index: users.length + 1
        };
        users.push(bot);
        isSingleGame.setID(bot.index);

        returnedData.push(createGameWithBot(userID));

        resolve(returnedData);
        break;
      default:
        resolve(undefined);
        break;
    }
  });
}

function checkWinner(returnedData: any) {
  allShipsData.forEach((player, i) => {
    if (
      player.ships.every((ship) => {
        return ship.every((pos: Position) => {
          return pos.state === 'dead';
        });
      })
    ) {
      allShipsData.splice(i, 1);
      updateWinners(allShipsData[0].ownerId);
      returnedData.push(handleWinner(allShipsData[0].ownerId));
      // getNeighbourCells(isKilledShip.getIsKilled()).forEach((pos, i) => {
      //   returnedData.push(
      //     handleNeighbourCellsOpen(pos, i, allShipsData[0].ownerId)
      //   );
      // });
      rooms.length = 0;
      placedShips.length = 0;
      allShipsData.length = 0;
      returnedData.push(clearRooms());
    }
  });
}
