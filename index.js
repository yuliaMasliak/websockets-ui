import { httpServer } from './src/http_server/index.js';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;
let users = [];
const wss = new WebSocketServer({ server: httpServer });
wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log(`Received message ${data}`);
    const parsedData = JSON.parse(data);
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
    users.push(newUser);
    const dataToSend = JSON.stringify(newUser);
    ws.send(dataToSend);
  });

  ws.on('close', function () {
    console.log('соединение закрыто ');
  });
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});
