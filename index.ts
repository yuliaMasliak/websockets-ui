import { handleData } from './src/websocket/handleData';
import { WebSocketServer, WebSocket } from 'ws';
import {
  connectionCount,
  setCommectionsCout,
  users
} from './src/websocket/variables';
import { rooms } from './src/websocket/db';
import { httpServer } from './src/http_server/index';
import { Connection } from './src/models';
import { handleUsers } from './src/websocket/handleUsers';
let connections: Connection[] = [];

export const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws: WebSocket & { userID: number }) {
  setCommectionsCout(connectionCount + 1);
  console.log(
    `Websocket connection established succesfully.\nCurrently there are ${connectionCount} ws connections`
  );

  ws.on('error', console.error);

  ws.on('message', function message(data: string) {
    console.log(`Received message ${data}`);

    const parsedData: any = JSON.parse(data);
    if (parsedData.type === 'reg') {
      const innerData = handleUsers(parsedData);
      ws.userID = innerData.index;
      connections.push(ws);
      const newUser = {
        type: parsedData.type,
        data: JSON.stringify(innerData),
        id: parsedData.id
      };
      connections.forEach((connection) => {
        if (connection.userID === ws.userID) {
          connection.send(JSON.stringify(newUser));
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
    setCommectionsCout(connectionCount - 1);
    console.log('connection closed');
  });
});
