import { handleShootStatus } from '../handleShootStatus';
import { isSingleGame } from './botClass';

export function handleAttaksSinglePlay(
  parsedData: any,
  userID: number,
  random: boolean
) {
  let competitorId = isSingleGame.id;
  console.log('from attack: ' + competitorId);

  let innerData = {
    position: {
      x: JSON.parse(parsedData.data).x,
      y: JSON.parse(parsedData.data).y
    },
    currentPlayer: userID,
    status: handleShootStatus(competitorId, JSON.parse(parsedData.data))
  };
  if (random) {
    const data = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
      state: 'alive'
    };
    innerData.position.x = data.x;
    innerData.position.y = data.y;
    innerData.status = handleShootStatus(competitorId, data);
  }

  const newAttack = {
    type: 'attack',
    data: JSON.stringify(innerData),
    id: parsedData.id
  };

  //   console.log(innerData);

  const dataToSend = JSON.stringify(newAttack);

  return dataToSend;
}
