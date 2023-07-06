import { users, setCurrentUser } from './db.js';

export function handleUsers(parsedData) {
  const userName = JSON.parse(parsedData.data);
  const innerData = {
    name: JSON.stringify(userName.name),
    index: users.length + 1,
    error: false,
    errorText: 'error'
  };
  const user = {
    name: innerData.name,
    index: innerData.index
  };
  users.push(user);
  setCurrentUser(innerData.name, innerData.index);
  const newUser = {
    type: parsedData.type,
    data: JSON.stringify(innerData),
    id: parsedData.id
  };

  const dataToSend = JSON.stringify(newUser);
  return dataToSend;
}
