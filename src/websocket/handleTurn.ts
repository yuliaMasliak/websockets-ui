import { turns, games, setTurnUserId, users } from './variables';

export function handleTurn(prsedData: any) {
  const currentUserAttack = JSON.parse(prsedData.data).indexPlayer;
  let nextUserAttack: number = 0;

  users.forEach((user, i) => {
    if (user.index === currentUserAttack) {
      const usersCopy = [...users];
      usersCopy.splice(i, 1);
      nextUserAttack = usersCopy[0].index;
      setTurnUserId(nextUserAttack);
    }
  });

  const innerData = {
    currentPlayer: nextUserAttack
  };

  const newTurn = {
    type: 'turn',
    data: JSON.stringify(innerData),
    id: turns.length
  };

  const dataToSend = JSON.stringify(newTurn);

  return dataToSend;
}
