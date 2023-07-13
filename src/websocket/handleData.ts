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
          returnedData.length = 0;
          const botShips = {
            id: isSingleGame.id,
            ships: isSingleGame.ships
          };

          const userShips = {
            id: userID,
            ships: JSON.parse(parsedData.data).ships
          };

          placedShips.push(botShips, userShips);
          console.log(placedShips.length);

          allShipsData.push(
            createShipsData(userShips),
            createShipsData(botShips)
          );
          placedShips.forEach((userPlacedShips: any, i: number) => {
            returnedData.push(handleStartGame(userPlacedShips, i));
          });
          returnedData.push(handleFirstTurnWithBot(userID));
        }
        resolve(returnedData);
        break;
      case 'attack':
        returnedData.length = 0;
        isKilledShip.setIsKilled(false);
        setIsRandom(false);

        //Mutual game
        if (!isSingleGame.gettIsSingleGame()) {
          if (turnUserId === userID) {
            returnedData.push(handleAttaks(parsedData, userID, getIsRandom()));
            getNeighbours(returnedData, userID);

            if (currentShootStatus === 'miss') {
              isKilledShip.setIsKilled(false);
              returnedData.push(handleTurn(parsedData));
            }
          }
          checkWinner(returnedData);
          resolve(returnedData);
          break;
        } else if (isSingleGame.gettIsSingleGame()) {
          setIsRandom(false);
          //Game with bot
          if (turnUserId !== isSingleGame.id) {
            returnedData.push(handleAttaks(parsedData, userID, getIsRandom()));
            getNeighbours(returnedData, userID);
            if (currentShootStatus === 'miss') {
              isKilledShip.setIsKilled(false);
              returnedData.push(handleTurn(parsedData));
            }
            checkWinner(returnedData);
            resolve(returnedData);
          }
          if (turnUserId === isSingleGame.id) {
            botAttack();

            function botAttack() {
              // setTimeout(() => {
              returnedData.push(botAttak(userID));
              if (currentShootStatus === 'miss') {
                isKilledShip.setIsKilled(false);
                returnedData.push(changeTurnWithBot(userID));
                resolve(returnedData);
              } else {
                botAttack();
                checkWinner(returnedData);
              }
              // }, 2000);
            }
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
        checkWinner(returnedData);
        getNeighbours(returnedData, userID);
        rooms.length = 0;
        allShipsData.length = 0;
        returnedData.push(clearRooms());

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

function getNeighbours(returnedData: any, id: number) {
  getNeighbourCells(isKilledShip.getIsKilled()).forEach((pos, i) => {
    returnedData.push(handleNeighbourCellsOpen(pos, i, id));
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

      rooms.length = 0;
      placedShips.length = 0;
      allShipsData.length = 0;
      returnedData.push(clearRooms());
    }
  });
}
