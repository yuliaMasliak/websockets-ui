import { turns, games } from './db';

export function handleTurn(prsedData: any) {
  const currentGameID = JSON.parse(prsedData.data).gameId;
  const currentUserAttack = JSON.parse(prsedData.data).indexPlayer;
  let nextUserAttack: number = 0;

  games.forEach((game) => {
    if (game.gameId === currentGameID) {
      game.users.forEach((user, i) => {
        if (user.index === currentUserAttack) {
          const usersCopy = [...game.users];
          usersCopy.splice(i, 1);
          nextUserAttack = usersCopy[0].index;
        }
      });
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
  console.log(dataToSend);
  return dataToSend;
}
