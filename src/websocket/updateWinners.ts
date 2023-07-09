import { usersData } from './db';

export function updateWinners(winnerID: number) {
  usersData.forEach((user) => {
    if (user.index === winnerID) {
      user.wins += 1;
    }
  });
}
