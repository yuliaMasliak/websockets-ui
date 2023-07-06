import { handleData } from './src/http_server/handleData.js';
import { WebSocketServer } from 'ws';
import { users, rooms } from './src/http_server/db.js';

const WS_PORT = 3000;

export const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log(`Received message ${data}`);
    handleData(data).forEach((el) => {
      ws.send(el);
    });
  });

  ws.on('close', function () {
    rooms.length = 0;
    users.length = 0;
    console.log('соединение закрыто ');
  });
});
