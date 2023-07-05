import { rooms } from './db.js';
import { users } from './db.js';

export function handleRooms(parsedData) {
  console.log(users);
  const innerData = {
    idGame: rooms.length,
    idPlayer: users[users.length - 1].id
  };
  const newGame = {
    type: 'create_game',
    data: JSON.stringify(innerData),
    id: parsedData.id
  };
  const newRoom = {
    id: parsedData.id
  };
  rooms.push(newRoom);
  const dataToSend = JSON.stringify(newGame);
  return dataToSend;
}

export function handleSingleRoomPlay(parsedData) {
  const innerData = {
    idGame: rooms.length,
    idPlayer: users[users.length - 1].id
  };
  const newGame = {
    type: 'create_game',
    data: JSON.stringify(innerData),
    id: parsedData.id
  };
  const newRoom = {
    id: parsedData.id
  };
  rooms.push(newRoom);
  let dataToSend = JSON.stringify(newGame);
  return dataToSend;
}
