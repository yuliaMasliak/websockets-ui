import { users } from './variables';
import { UserData } from '../models';
import { usersData } from './db';

export function handleUsers(parsedData: UserData) {
  const userName = JSON.parse(parsedData.data);
  const user = {
    name: JSON.stringify(userName.name),
    index: users.length + 1
  };
  const userDB = {
    name: JSON.stringify(userName.name),
    password: JSON.stringify(userName.password),
    index: users.length + 1
  };

  users.push(user);
  usersData.push(userDB);
  const innerData = {
    name: userDB.name,
    index: userDB.index,
    error: false,
    errorText: 'error'
  };

  return innerData;
}
