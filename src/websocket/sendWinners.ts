import { usersData } from './db';

export function sendUpdatedWinners() {
  let innerData: any = [];
  console.log(usersData);

  usersData.forEach((user) => {
    const obj = {
      name: user.name,
      wins: user.wins
    };
    innerData.push(obj);
  });

  const winner = {
    type: 'update_winners',
    data: JSON.stringify(innerData),
    id: 0
  };
  const dataToSend = JSON.stringify(winner);
  return dataToSend;
}
