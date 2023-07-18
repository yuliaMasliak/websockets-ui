import { users } from './variables';
import { UserData } from '../models';
import { usersData } from './db';

export function validateUser(parsedData: UserData) {
  const userName = JSON.parse(parsedData.data);

  const existingName = usersData.find((user) => {
    return user.name === JSON.stringify(userName.name);
  });

  if (existingName) {
    if (existingName?.password === JSON.stringify(userName.password)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
