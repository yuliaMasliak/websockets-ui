import { users } from './db.js';

export function handleUsers(parsedData) {
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
  return dataToSend;
}
