import { users } from './db';
import { UserData } from '../models';

export function handleUsers(parsedData: UserData) {
  const userName = JSON.parse(parsedData.data);
  console.log(userName);

  const innerData = {
    name: JSON.stringify(userName.name),
    index: users.length,
    error: false,
    errorText: 'error'
  };
  console.log(innerData);

  const newUser = {
    type: parsedData.type,
    data: JSON.stringify(innerData),
    id: parsedData.id
  };
  const user = {
    name: innerData.name,
    index: innerData.index
  };
  users.push(user);
  const dataToSend = JSON.stringify(newUser);
}
