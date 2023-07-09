import { users, connections } from './db';
import { UserData } from '../models';

export function handleUsers(parsedData: UserData) {
  const userName = JSON.parse(parsedData.data);
  const userDB = {
    name: JSON.stringify(userName.name),
    index: users.length + 1
  };

  users.push(userDB);

  const innerData = {
    name: userDB.name,
    index: userDB.index,
    error: false,
    errorText: 'error'
  };

  return innerData;
}
