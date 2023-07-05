export function handleAddingShips(parsedData) {
  const innerData = {
    ships: JSON.parse(parsedData.data).ships,
    currentPlayerIndex: parsedData.indexPlayer
  };
  const startGame = {
    type: 'start_game',
    data: JSON.stringify(innerData),
    id: parsedData.id
  };

  const dataToSend = JSON.stringify(startGame);

  return dataToSend;
}
