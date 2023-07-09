import { handleData } from './src/websocket/handleData';
import { WebSocketServer, WebSocket } from 'ws';
import { users, rooms } from './src/websocket/db';
import { httpServer } from './src/http_server/index';
import { Connection } from './src/models';
let connections: Connection[] = [];

export const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws: WebSocket & { userID: number }) {
  ws.on('error', console.error);

  ws.on('message', function message(data: string) {
    console.log(`Received message ${data}`);
    const parsedData: any = JSON.parse(data);
    if (parsedData.type === 'reg') {
      const userName = JSON.parse(parsedData.data);
      const userDB = {
        name: JSON.stringify(userName.name),
        index: users.length + 1
      };
      ws.userID = userDB.index;
      connections.push(ws);
      users.push(userDB);

      const innerData = {
        name: userDB.name,
        index: ws.userID,
        error: false,
        errorText: 'error'
      };

      const newUser = {
        type: parsedData.type,
        data: JSON.stringify(innerData),
        id: parsedData.id
      };

      const dataToSend = JSON.stringify(newUser);
      connections.forEach((connection) => {
        if (connection.userID === ws.userID) {
          connection.send(dataToSend);
        }
      });
    } else {
      if (data !== null) {
        handleData(data, ws.userID).forEach((el: any) => {
          if (el.playerId) {
            connections.forEach((connection) => {
              if (el.playerId === connection.userID) {
                connection.send(el.data);
              }
            });
          } else {
            connections.forEach((connection) => {
              connection.send(el);
            });
          }
        });
      }
    }
  });

  ws.on('close', function () {
    rooms.length = 0;
    users.length = 0;
    console.log('connection closed');
  });
});
