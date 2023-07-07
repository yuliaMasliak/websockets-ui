export function handleAttaks(parsedData: any, userID: number) {
  const innerData = {
    position: {
      x: JSON.parse(parsedData.data).x,
      y: JSON.parse(parsedData.data).y
    },
    currentPlayerIndex: userID,
    status: 'miss' || 'killed' || 'shot'
  };
  const newAttack = {
    type: 'attack',
    data: JSON.stringify(innerData),
    id: parsedData.id
  };

  const dataToSend = JSON.stringify(newAttack);
  return dataToSend;
}
