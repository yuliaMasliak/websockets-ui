import { handleData } from './src/http_server/handleData';
import { WebSocketServer, WebSocket } from 'ws';
import { users, rooms } from './src/http_server/db';
import { User } from './src/modules';
const connections: WebSocket[] = [];

export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws: WebSocket & { userID: number }) {
  connections.push(ws);
  ws.on('error', console.error);

  ws.on('message', function message(data: string) {
    console.log(`Received message ${data}`);
    const parsedData: any = JSON.parse(data);
    if (parsedData.type === 'reg') {
      const userName = JSON.parse(parsedData.data);
      const innerData = {
        name: JSON.stringify(userName.name),
        index: users.length,
        error: false,
        errorText: 'error'
      };
      const newUser = {
        type: parsedData.type,
        data: JSON.stringify(innerData),
        id: parsedData.id
      };
      const userDB = {
        name: innerData.name,
        index: innerData.index
      };
      users.push(userDB);
      const dataToSend = JSON.stringify(newUser);
      ws.userID = userDB.index;
      ws.send(dataToSend);
    } else {
      if (data !== null) {
        handleData(data, ws.userID)!.forEach((el) => {
          connections.forEach((connection) => {
            connection.send(el);
          });
        });
      }
    }
  });

  ws.on('close', function () {
    rooms.length = 0;
    users.length = 0;
    console.log('соединение закрыто ');
  });
});
