export function handleWinnerBotGame(winnerID: number) {
  const innerData = {
    winPlayer: winnerID
  };
  const winner = {
    type: 'finish',
    data: JSON.stringify(innerData),
    id: 0
  };
  const dataToSend = JSON.stringify(winner);
  const res = {
    playerId: winnerID,
    data: dataToSend
  };
  return res;
}
