export function handleShootStatus(
  parsedData: any,
  competitorsShips: []
): string {
  let result = '';
  console.log(competitorsShips);

  //   competitorsShips.forEach((position) => {
  //     if (
  //       position.x === JSON.parse(parsedData.data).x &&
  //       position.y === JSON.parse(parsedData.data).y
  //     ) {
  //       result = 'killed';
  //     } else {
  //       result = 'missed';
  //     }
  //   });
  return result;
}
