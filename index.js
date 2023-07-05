import { handleData } from './src/http_server/handleData.js';
import { httpServer } from './src/http_server/index.js';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;

export const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log(`Received message ${data}`);
    handleData(data).forEach((el) => {
      ws.send(el);
    });
  });

  ws.on('close', function () {
    console.log('соединение закрыто ');
  });
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});
